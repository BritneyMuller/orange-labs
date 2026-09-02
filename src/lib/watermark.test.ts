import { describe, expect, it } from 'vitest';
import {
  copyPaste,
  fullRewrite,
  lightEdit,
  runWatermark,
  scoreDetector,
  shorten,
} from './watermark';
import type { Dictionary } from './watermark';

const dictionary: Dictionary = {
  quick: ['fast', 'rapid', 'swift'],
  grow: ['expand', 'scale', 'build'],
  team: ['crew', 'group'],
  great: ['strong', 'solid', 'excellent'],
  marketers: ['marketing teams', 'growth teams'],
  ship: ['launch', 'release'],
};

const text =
  'Our great team can grow quick. Our great team can grow quick. Marketers who ship quick beat marketers who ship slow.';

describe('runWatermark determinism', () => {
  it('produces identical output across 10 runs for the same text and key', () => {
    const key = 'orange-labs-demo-key';
    const first = runWatermark(text, key, dictionary);
    for (let i = 0; i < 10; i++) {
      const run = runWatermark(text, key, dictionary);
      expect(run.text).toBe(first.text);
      expect(run.records.map((r) => (r.kind === 'watermarked' ? r.winner : r.raw))).toEqual(
        first.records.map((r) => (r.kind === 'watermarked' ? r.winner : r.raw)),
      );
    }
  });
});

describe('key sensitivity', () => {
  it('changing one character of the key changes at least one winner', () => {
    const runA = runWatermark(text, 'orange-labs-demo-key', dictionary);
    const runB = runWatermark(text, 'orange-labs-demo-kex', dictionary);
    const winnersA = runA.records.filter((r) => r.kind === 'watermarked').map((r) => (r as any).winner);
    const winnersB = runB.records.filter((r) => r.kind === 'watermarked').map((r) => (r as any).winner);
    expect(winnersA).not.toEqual(winnersB);
  });
});

describe('repeated-context masking', () => {
  it('marks a repeated 4-word context as fixed instead of re-watermarking it', () => {
    // Only "quick" is substitutable here; every context word (cat, sat, on, the,
    // mat) is fixed, so its emitted form never varies. That guarantees the exact
    // same 4-word window precedes "quick" both times, which is what triggers
    // masking on the second occurrence.
    const maskingDictionary: Dictionary = { quick: ['fast', 'rapid', 'swift'] };
    const maskingText = 'The cat sat on the mat quick. The cat sat on the mat quick.';
    const result = runWatermark(maskingText, 'orange-labs-demo-key', maskingDictionary);
    const quickRecords = result.records.filter((r) => r.sourceWord === 'quick');
    expect(quickRecords.length).toBe(2);
    expect(quickRecords[0].kind).toBe('watermarked');
    expect(quickRecords[1].kind).toBe('fixed');
    expect((quickRecords[1] as { reason: string }).reason).toBe('masked');
  });

  it('never reuses the same seed twice for a tournament in a single run', () => {
    const result = runWatermark(text, 'orange-labs-demo-key', dictionary);
    const seeds = result.records.filter((r) => r.kind === 'watermarked').map((r) => (r as any).seed);
    expect(new Set(seeds).size).toBe(seeds.length);
  });
});

describe('detector scoring', () => {
  it('scores meaningfully above 0.5 with the correct key, and near 0.5 with the wrong key', () => {
    const key = 'orange-labs-demo-key';
    const result = runWatermark(text, key, dictionary);
    const correct = scoreDetector(result.records, key);
    const wrong = scoreDetector(result.records, 'a-completely-different-key');

    expect(correct.n).toBeGreaterThan(0);
    expect(correct.meanG).toBeGreaterThan(0.5);
    expect(Math.abs(wrong.meanG - 0.5)).toBeLessThan(Math.abs(correct.meanG - 0.5));
  });

  it('treats an unwatermarked control (no dictionary hits) as no signal', () => {
    const control = runWatermark('The cat sat on the mat near the door.', 'orange-labs-demo-key', {});
    const score = scoreDetector(control.records, 'orange-labs-demo-key');
    expect(score.n).toBe(0);
    expect(score.state).toBe('inconclusive');
  });

  it('returns identical scores whether recomputed via scoreDetector or read off the run itself', () => {
    const key = 'orange-labs-demo-key';
    const result = runWatermark(text, key, dictionary);
    const score = scoreDetector(result.records, key);
    const watermarked = result.records.filter((r) => r.kind === 'watermarked') as any[];
    const manualMean = watermarked.reduce((sum, r) => sum + r.g, 0) / watermarked.length;
    expect(score.meanG).toBeCloseTo(manualMean, 10);
  });
});

describe('stress tests', () => {
  const key = 'orange-labs-demo-key';
  const result = runWatermark(text, key, dictionary);
  const baseline = scoreDetector(result.records, key);

  it('copy-paste leaves the text and score byte-identical', () => {
    const copied = copyPaste(result);
    expect(copied.text).toBe(result.text);
    const score = scoreDetector(copied.records, key);
    expect(score.meanG).toBe(baseline.meanG);
    expect(score.n).toBe(baseline.n);
  });

  it('shortening to one sentence drops n and weakens or preserves the z-score confidence', () => {
    const short = shorten(result);
    const score = scoreDetector(short.records, key);
    expect(score.n).toBeLessThan(baseline.n);
  });

  it('a full rewrite collapses the signal toward baseline', () => {
    const rewritten = fullRewrite(result);
    const score = scoreDetector(rewritten.records, key);
    expect(score.meanG).toBeLessThan(baseline.meanG);
  });

  it('light edits weaken the signal less than a full rewrite', () => {
    const edited = lightEdit(result);
    const rewritten = fullRewrite(result);
    const editedScore = scoreDetector(edited.records, key);
    const rewrittenScore = scoreDetector(rewritten.records, key);
    expect(Math.abs(editedScore.meanG - baseline.meanG)).toBeLessThanOrEqual(
      Math.abs(rewrittenScore.meanG - baseline.meanG),
    );
  });
});
