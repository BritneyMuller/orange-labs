/*
 * Pure, dependency-free simulation of SynthID-Text style tournament sampling.
 *
 * This is a simulation for a demo, not the real algorithm. The real SynthID-Text
 * samples candidate tokens from the model's full probability distribution over
 * its vocabulary and runs a multi-layer knockout tournament across many more
 * candidates than shown here. This module substitutes a small, fixed synonym
 * dictionary (2-5 alternatives per word) so the mechanism is visible and
 * explorable in a browser. No network calls, no Math.random, fully deterministic
 * given the same (text, key, dictionary) inputs.
 */

export type Dictionary = Record<string, string[]>;

export interface Candidate {
  word: string;
  g: number;
}

export interface TournamentMatch {
  a: string;
  b: string | null;
  gA: number;
  gB: number | null;
  winner: string;
}

interface BaseRecord {
  index: number;
  raw: string;
  sourceWord: string;
  context: string;
}

export interface FixedRecord extends BaseRecord {
  kind: 'fixed';
  reason: 'no-alternatives' | 'masked';
}

export interface WatermarkedRecord extends BaseRecord {
  kind: 'watermarked';
  winner: string;
  candidates: Candidate[];
  rounds: TournamentMatch[][];
  seed: string;
  g: number;
}

export type WordRecord = FixedRecord | WatermarkedRecord;

export type StreamItem = { kind: 'word'; recordIndex: number } | { kind: 'other'; text: string };

export interface WatermarkResult {
  text: string;
  records: WordRecord[];
  stream: StreamItem[];
}

export interface TransformResult {
  text: string;
  records: WordRecord[];
}

/**
 * xmur3: a well-known 32-bit string hash (public domain, widely used for
 * seeding deterministic PRNGs in creative-coding contexts). Used here purely
 * as a hash, not a random number generator: same input string always produces
 * the same 32-bit integer.
 */
export function xmur3(str: string): () => number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

/** Uniform pseudorandom value in [0, 1) derived deterministically from a string. */
export function hashUnit(seed: string): number {
  const h = xmur3(seed)();
  return (h >>> 0) / 4294967296;
}

/** g(word, seed): the score that decides tournament matches. */
export function g(word: string, seed: string): number {
  return hashUnit(`${seed}|${word}`);
}

/** Lowercases and strips everything but letters and apostrophes, for dictionary lookups. */
export function normalize(word: string): string {
  return word.toLowerCase().replace(/[^a-z']/g, '');
}

function applyCase(raw: string, candidate: string): string {
  if (raw.length > 1 && raw === raw.toUpperCase() && /[A-Z]/.test(raw)) {
    return candidate.toUpperCase();
  }
  if (/^[A-Z]/.test(raw)) {
    return candidate.charAt(0).toUpperCase() + candidate.slice(1);
  }
  return candidate;
}

export function displayOf(record: WordRecord): string {
  return record.kind === 'fixed' ? record.raw : applyCase(record.raw, record.winner);
}

interface RawToken {
  kind: 'word' | 'other';
  raw: string;
}

function tokenize(text: string): RawToken[] {
  const matches = text.match(/[A-Za-z']+|[^A-Za-z'\s]+|\s+/g) ?? [];
  return matches.map((raw) => ({ kind: /^[A-Za-z']+$/.test(raw) ? 'word' : 'other', raw }));
}

/** Single-elimination bracket: pairs advance by higher g-value, byes advance automatically. */
export function runBracket(
  candidates: string[],
  seed: string,
): { rounds: TournamentMatch[][]; winner: string; gValues: Record<string, number> } {
  const gValues: Record<string, number> = {};
  for (const candidate of candidates) gValues[candidate] = g(candidate, seed);

  const rounds: TournamentMatch[][] = [];
  let current = candidates.slice();

  while (current.length > 1) {
    const round: TournamentMatch[] = [];
    const next: string[] = [];
    for (let i = 0; i < current.length; i += 2) {
      const a = current[i];
      const b = current[i + 1];
      if (b === undefined) {
        round.push({ a, b: null, gA: gValues[a], gB: null, winner: a });
        next.push(a);
      } else {
        const winner = gValues[a] >= gValues[b] ? a : b;
        round.push({ a, b, gA: gValues[a], gB: gValues[b], winner });
        next.push(winner);
      }
    }
    rounds.push(round);
    current = next;
  }

  return { rounds, winner: current[0], gValues };
}

/**
 * Runs the full simulation over a piece of text: tokenizes, and for each word
 * either marks it fixed (no plausible alternatives, or the same 4-word context
 * has already been used this run) or runs a tournament and records the winner.
 */
export function runWatermark(text: string, key: string, dictionary: Dictionary): WatermarkResult {
  const rawTokens = tokenize(text);
  const records: WordRecord[] = [];
  const stream: StreamItem[] = [];
  const emittedLower: string[] = [];
  const usedSeeds = new Set<string>();
  let wordIndex = 0;

  for (const token of rawTokens) {
    if (token.kind !== 'word') {
      stream.push({ kind: 'other', text: token.raw });
      continue;
    }

    const sourceWord = normalize(token.raw);
    const alternatives = dictionary[sourceWord] ?? [];
    const candidateWords = Array.from(new Set([sourceWord, ...alternatives]));
    const context = emittedLower.slice(-4).join(' ');

    if (candidateWords.length < 2) {
      records.push({
        kind: 'fixed',
        index: wordIndex,
        raw: token.raw,
        sourceWord,
        reason: 'no-alternatives',
        context,
      });
      stream.push({ kind: 'word', recordIndex: records.length - 1 });
      emittedLower.push(sourceWord);
      wordIndex++;
      continue;
    }

    const seed = `${key}|${context}`;

    if (usedSeeds.has(seed)) {
      records.push({
        kind: 'fixed',
        index: wordIndex,
        raw: token.raw,
        sourceWord,
        reason: 'masked',
        context,
      });
      stream.push({ kind: 'word', recordIndex: records.length - 1 });
      emittedLower.push(sourceWord);
      wordIndex++;
      continue;
    }
    usedSeeds.add(seed);

    const { rounds, winner, gValues } = runBracket(candidateWords, seed);
    const candidates: Candidate[] = candidateWords.map((word) => ({ word, g: gValues[word] }));

    records.push({
      kind: 'watermarked',
      index: wordIndex,
      raw: token.raw,
      sourceWord,
      winner,
      candidates,
      rounds,
      seed,
      context,
      g: gValues[winner],
    });
    stream.push({ kind: 'word', recordIndex: records.length - 1 });
    emittedLower.push(winner);
    wordIndex++;
  }

  const reconstructedText = stream
    .map((item) => (item.kind === 'word' ? displayOf(records[item.recordIndex]) : item.text))
    .join('');

  return { text: reconstructedText, records, stream };
}

export type DetectorState = 'likely' | 'inconclusive' | 'no-signal';

export interface DetectorResult {
  n: number;
  meanG: number;
  sd: number;
  z: number;
  state: DetectorState;
}

/**
 * Scores a run's watermarked positions against a given key. Passing the
 * generation key reproduces the original g-values exactly. Passing a
 * different key recomputes g for the same words and contexts, which is what
 * the "wrong key" toggle in the UI uses to show the signal collapse to ~0.5.
 *
 * z-score thresholds (1.645, 0.5) are a UI convention for labeling the three
 * states, not a published accuracy figure from Anthropic or Google. The
 * MIN_N_FOR_CONFIDENCE floor is the same kind of convention: neither Anthropic
 * nor Google publish a minimum word count, but the appendix fact "performs
 * poorly on small samples" needs to actually show up in the demo, and a z-score
 * alone can still look confident off two or three lucky words.
 */
const MIN_N_FOR_CONFIDENCE = 4;

export function scoreDetector(records: WordRecord[], testKey: string): DetectorResult {
  const watermarked = records.filter((r): r is WatermarkedRecord => r.kind === 'watermarked');
  const n = watermarked.length;

  if (n === 0) return { n: 0, meanG: 0, sd: 0, z: 0, state: 'inconclusive' };

  const values = watermarked.map((r) => g(r.winner, `${testKey}|${r.context}`));
  const meanG = values.reduce((sum, v) => sum + v, 0) / n;

  if (n < 2) return { n, meanG, sd: 0, z: 0, state: 'inconclusive' };

  const variance = values.reduce((sum, v) => sum + (v - meanG) ** 2, 0) / (n - 1);
  const sd = Math.sqrt(variance);
  const z = sd > 0 ? (meanG - 0.5) / (sd / Math.sqrt(n)) : 0;

  let state: DetectorState = 'inconclusive';
  if (z >= 1.645 && n >= MIN_N_FOR_CONFIDENCE) state = 'likely';
  else if (z <= 0.5) state = 'no-signal';

  return { n, meanG, sd, z, state };
}

function reconstructText(stream: StreamItem[], records: WordRecord[]): string {
  return stream.map((item) => (item.kind === 'word' ? displayOf(records[item.recordIndex]) : item.text)).join('');
}

function pickWorstCandidate(record: WatermarkedRecord): string {
  const sorted = [...record.candidates].sort((a, b) => a.g - b.g);
  const worst = sorted.find((c) => c.word !== record.winner);
  return worst ? worst.word : sorted[0].word;
}

/** Byte-identical copy. Nothing to strip, nothing changes. */
export function copyPaste(result: WatermarkResult): TransformResult {
  return { text: result.text, records: result.records };
}

/** Keeps only the first sentence, dropping the rest of the run's records. */
export function shorten(result: WatermarkResult): TransformResult {
  const { stream, records } = result;
  let cutAt = stream.length;
  for (let i = 0; i < stream.length; i++) {
    const item = stream[i];
    if (item.kind === 'other' && /[.!?]/.test(item.text)) {
      cutAt = i + 1;
      break;
    }
  }
  const newStream = stream.slice(0, cutAt);
  const usedIndexes = new Set(
    newStream.filter((item): item is { kind: 'word'; recordIndex: number } => item.kind === 'word').map((item) => item.recordIndex),
  );
  const keptRecords = records.filter((_, i) => usedIndexes.has(i));
  const text = reconstructText(newStream, records).trim();
  return { text, records: keptRecords };
}

/** Swaps roughly one in ten watermarked words for their lowest-scoring alternative. */
export function lightEdit(result: WatermarkResult): TransformResult {
  const watermarkedIndexes = result.records
    .map((r, i) => ({ r, i }))
    .filter((x) => x.r.kind === 'watermarked');
  const editIndexes = new Set(watermarkedIndexes.filter((_, pos) => pos % 10 === 0).map((x) => x.i));

  const records = result.records.map((r, i) => {
    if (r.kind === 'watermarked' && editIndexes.has(i)) {
      const winner = pickWorstCandidate(r);
      const gVal = r.candidates.find((c) => c.word === winner)?.g ?? g(winner, r.seed);
      return { ...r, winner, g: gVal };
    }
    return r;
  });

  return { text: reconstructText(result.stream, records), records };
}

/** Swaps every watermarked word for its lowest-scoring alternative. */
export function fullRewrite(result: WatermarkResult): TransformResult {
  const records = result.records.map((r) => {
    if (r.kind === 'watermarked') {
      const winner = pickWorstCandidate(r);
      const gVal = r.candidates.find((c) => c.word === winner)?.g ?? g(winner, r.seed);
      return { ...r, winner, g: gVal };
    }
    return r;
  });

  return { text: reconstructText(result.stream, records), records };
}
