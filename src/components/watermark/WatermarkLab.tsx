import { useEffect, useMemo, useRef, useState } from 'react';
import synonyms from '../../data/synonyms.json';
import {
  copyPaste,
  displayOf,
  fullRewrite,
  lightEdit,
  runWatermark,
  scoreDetector,
  shorten,
  type Dictionary,
  type DetectorResult,
  type StreamItem,
  type WatermarkResult,
  type WordRecord,
} from '../../lib/watermark';

const dictionary = synonyms as Dictionary;

interface Sample {
  label: string;
  note: string;
  text: string;
}

interface StressTest {
  id: 'copy-paste' | 'shorten' | 'light-edit' | 'full-rewrite';
  label: string;
  caption: string;
}

interface Props {
  samples: Sample[];
  defaultKey: string;
  stressTests: StressTest[];
  sidebarLabels: { processed: string; tournaments: string; skipped: string; meanG: string };
  detectorStates: { likely: string; inconclusive: string; 'no-signal': string };
  disclaimer: string;
  mechanismNote: string;
  wrongKeyLabel: string;
  wrongKeyNote: string;
}

const SPEED_MS: Record<string, number> = { Slow: 1000, Normal: 600, Instant: 0 };

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function fmt(n: number): string {
  return n.toFixed(3);
}

function announceFor(record: WordRecord): string {
  if (record.kind === 'fixed') {
    return record.reason === 'masked'
      ? `${record.raw}, fixed, this context already appeared`
      : `${record.raw}, fixed, no plausible alternative`;
  }
  const others = record.candidates.filter((c) => c.word !== record.winner).map((c) => c.word);
  return `${displayOf(record)} chosen over ${others.join(', ')}, g equals ${fmt(record.g)}`;
}

function StateLabel({ state, labels }: { state: DetectorResult['state']; labels: Props['detectorStates'] }) {
  const cls = state === 'likely' ? 'dstate dstate-likely' : state === 'no-signal' ? 'dstate dstate-no' : 'dstate dstate-inc';
  return <span className={cls}>{labels[state]}</span>;
}

function DetectorNumbers({ score }: { score: DetectorResult }) {
  return (
    <dl className="dnums">
      <div>
        <dt>n</dt>
        <dd>{score.n}</dd>
      </div>
      <div>
        <dt>mean g</dt>
        <dd>{fmt(score.meanG)}</dd>
      </div>
      <div>
        <dt>z</dt>
        <dd>{Number.isFinite(score.z) ? score.z.toFixed(2) : '—'}</dd>
      </div>
    </dl>
  );
}

function Bracket({ record }: { record: WordRecord }) {
  if (record.kind === 'fixed') {
    return (
      <div className="bracket bracket-fixed">
        <p className="bracket-word">{record.raw}</p>
        <p className="bracket-note">
          {record.reason === 'masked'
            ? 'Fixed. This exact 4-word context already appeared earlier in the run, so the watermark is not reapplied here.'
            : 'Fixed. No plausible alternative in the demo dictionary, so this word is skipped.'}
        </p>
      </div>
    );
  }
  return (
    <div className="bracket">
      <p className="bracket-context">
        context: <span>&ldquo;{record.context || '(start of text)'}&rdquo;</span>
      </p>
      <p className="bracket-seed">seed = hash(key + last 4 words)</p>
      <div className="bracket-rounds">
        {record.rounds.map((round, ri) => (
          <div className="bracket-round" key={ri}>
            {round.map((match, mi) => (
              <div className="bracket-match" key={mi}>
                <span className={match.winner === match.a ? 'bm-word bm-win' : 'bm-word'}>
                  {match.a} <em>{fmt(match.gA)}</em>
                </span>
                {match.b !== null ? (
                  <>
                    <span className="bm-vs">vs</span>
                    <span className={match.winner === match.b ? 'bm-word bm-win' : 'bm-word'}>
                      {match.b} <em>{fmt(match.gB as number)}</em>
                    </span>
                  </>
                ) : (
                  <span className="bm-bye">bye</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="bracket-winner">
        Winner: <strong>{record.winner}</strong> <span>g = {fmt(record.g)}</span>
      </p>
    </div>
  );
}

function Histogram({ values }: { values: number[] }) {
  const bins = new Array(10).fill(0);
  for (const v of values) {
    const idx = Math.min(9, Math.floor(v * 10));
    bins[idx]++;
  }
  const max = Math.max(1, ...bins);
  return (
    <div className="histogram" role="img" aria-label={`Histogram of ${values.length} g-values, mean ${values.length ? fmt(values.reduce((a, b) => a + b, 0) / values.length) : '0.000'}`}>
      <div className="histogram-bars">
        {bins.map((count, i) => (
          <div className="histogram-bar" key={i} style={{ height: `${(count / max) * 100}%` }} />
        ))}
        <div className="histogram-baseline" style={{ left: '50%' }} aria-hidden="true" />
      </div>
      <div className="histogram-labels">
        <span>0.0</span>
        <span className="histogram-baseline-label">0.5 baseline</span>
        <span>1.0</span>
      </div>
    </div>
  );
}

export default function WatermarkLab({
  samples,
  defaultKey,
  stressTests,
  sidebarLabels,
  detectorStates,
  disclaimer,
  mechanismNote,
  wrongKeyLabel,
  wrongKeyNote,
}: Props) {
  const reducedMotion = useReducedMotion();
  const [text, setText] = useState(samples[0]?.text ?? '');
  const [key, setKey] = useState(defaultKey);
  const [speed, setSpeed] = useState<'Slow' | 'Normal' | 'Instant'>('Normal');
  const [result, setResult] = useState<WatermarkResult | null>(null);
  const [revealed, setRevealed] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [liveMessage, setLiveMessage] = useState('');
  const [useWrongKey, setUseWrongKey] = useState(false);
  const [stressActive, setStressActive] = useState<StressTest['id'] | null>(null);
  const [stressResult, setStressResult] = useState<{ text: string; before: DetectorResult; after: DetectorResult } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  function stopTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function run() {
    stopTimer();
    const fresh = runWatermark(text, key, dictionary);
    setResult(fresh);
    setStressActive(null);
    setStressResult(null);
    setUseWrongKey(false);
    setActiveIndex(null);

    const instant = reducedMotion || speed === 'Instant';
    if (instant) {
      setRevealed(fresh.records.length);
      setActiveIndex(fresh.records.length - 1);
      const tournaments = fresh.records.filter((r) => r.kind === 'watermarked').length;
      const skipped = fresh.records.length - tournaments;
      setLiveMessage(
        `Run complete. ${fresh.records.length} words processed, ${tournaments} tournaments run, ${skipped} words skipped as fixed.`,
      );
      return;
    }

    setRevealed(0);
    let i = 0;
    const delay = SPEED_MS[speed];
    const step = () => {
      i++;
      setRevealed(i);
      setActiveIndex(i - 1);
      const record = fresh.records[i - 1];
      if (record) setLiveMessage(announceFor(record));
      if (i < fresh.records.length) {
        timerRef.current = setTimeout(step, delay);
      }
    };
    timerRef.current = setTimeout(step, delay || 50);
  }

  function skipAnimation() {
    if (!result) return;
    stopTimer();
    setRevealed(result.records.length);
    setActiveIndex(result.records.length - 1);
  }

  const isRunning = result !== null && revealed < result.records.length;
  const isComplete = result !== null && revealed === result.records.length && result.records.length > 0;

  const processedRecords = useMemo(() => (result ? result.records.slice(0, revealed) : []), [result, revealed]);
  const watermarkedSoFar = useMemo(() => processedRecords.filter((r) => r.kind === 'watermarked'), [processedRecords]);
  const meanGSoFar = useMemo(() => {
    if (watermarkedSoFar.length === 0) return 0;
    return watermarkedSoFar.reduce((sum, r) => sum + (r as any).g, 0) / watermarkedSoFar.length;
  }, [watermarkedSoFar]);

  const detectorScore = useMemo(() => {
    if (!result || !isComplete) return null;
    const testKey = useWrongKey ? `${key}-wrong` : key;
    return scoreDetector(result.records, testKey);
  }, [result, isComplete, useWrongKey, key]);

  function runStressTest(id: StressTest['id']) {
    if (!result || !detectorScore) return;
    stopTimer();
    const before = scoreDetector(result.records, key);
    let transformed;
    if (id === 'copy-paste') transformed = copyPaste(result);
    else if (id === 'shorten') transformed = shorten(result);
    else if (id === 'light-edit') transformed = lightEdit(result);
    else transformed = fullRewrite(result);
    const after = scoreDetector(transformed.records, key);
    setStressActive(id);
    setStressResult({ text: transformed.text, before, after });
  }

  const activeRecord = activeIndex !== null && result ? result.records[activeIndex] : null;

  return (
    <div className="wmlab">
      <p className="simdisclaimer" role="note">
        {disclaimer}
      </p>

      <div className="wmlab-controls">
        <div className="samplerow">
          {samples.map((s) => (
            <button
              key={s.label}
              type="button"
              className="samplechip"
              onClick={() => {
                setText(s.text);
                stopTimer();
                setResult(null);
                setRevealed(0);
              }}
            >
              {s.label} <span>{s.note}</span>
            </button>
          ))}
        </div>

        <label className="wmlabel" htmlFor="wm-text">
          Your text
        </label>
        <textarea
          id="wm-text"
          className="wmtextarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />

        <div className="wmlab-row">
          <div className="wmfield">
            <label className="wmlabel" htmlFor="wm-key">
              Watermark key
            </label>
            <input
              id="wm-key"
              className="wminput"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              spellCheck={false}
            />
          </div>

          <div className="wmfield">
            <span className="wmlabel" id="wm-speed-label">
              Speed
            </span>
            <div className="speedgroup" role="group" aria-labelledby="wm-speed-label">
              {(['Slow', 'Normal', 'Instant'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  className={s === speed ? 'speedbtn speedbtn-active' : 'speedbtn'}
                  aria-pressed={s === speed}
                  onClick={() => setSpeed(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="wmlab-actions">
          <button type="button" className="btn btn-ember" onClick={run} disabled={!text.trim()}>
            Run
          </button>
          {isRunning && (
            <button type="button" className="btn btn-ghost" onClick={skipAnimation}>
              Skip animation
            </button>
          )}
        </div>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {liveMessage}
      </p>

      {result && (
        <div className="wmlab-stage">
          <div className="wmstream-panel">
            <p className="wmpanel-label">Output</p>
            <p className="wmstream">
              {result.stream.map((item: StreamItem, i) =>
                item.kind === 'other' ? (
                  <span key={i}>{item.text}</span>
                ) : item.recordIndex < revealed ? (
                  (() => {
                    const record = result.records[item.recordIndex];
                    const isActive = item.recordIndex === activeIndex;
                    const cls =
                      record.kind === 'watermarked'
                        ? isActive
                          ? 'wmword wmword-win wmword-active'
                          : 'wmword wmword-win'
                        : isActive
                          ? 'wmword wmword-fixed wmword-active'
                          : 'wmword wmword-fixed';
                    return (
                      <button
                        key={i}
                        type="button"
                        className={cls}
                        onClick={() => setActiveIndex(item.recordIndex)}
                        title={record.kind === 'watermarked' ? `g = ${fmt(record.g)}` : record.reason}
                      >
                        {displayOf(record)}
                      </button>
                    );
                  })()
                ) : (
                  <span key={i} className="wmword wmword-pending">
                    {' '}
                    &middot;&middot;&middot;{' '}
                  </span>
                ),
              )}
            </p>

            <div className="wmpanel-label" style={{ marginTop: '1.5rem' }}>
              {activeRecord ? (activeRecord.kind === 'watermarked' ? 'Tournament' : 'Fixed word') : 'Tournament'}
            </div>
            {activeRecord ? (
              <Bracket record={activeRecord} />
            ) : (
              <p className="bracket-note">Run the simulator, then click any word above to inspect its bracket.</p>
            )}
            <p className="mechanismnote">{mechanismNote}</p>
          </div>

          <details className="wmsidebar" open>
            <summary>Run statistics</summary>
            <div className="wmstat">
              <span>{sidebarLabels.processed}</span>
              <strong>{processedRecords.length}</strong>
            </div>
            <div className="wmstat">
              <span>{sidebarLabels.tournaments}</span>
              <strong>{watermarkedSoFar.length}</strong>
            </div>
            <div className="wmstat">
              <span>{sidebarLabels.skipped}</span>
              <strong>{processedRecords.length - watermarkedSoFar.length}</strong>
            </div>
            <div className="wmstat">
              <span>{sidebarLabels.meanG}</span>
              <strong>{fmt(meanGSoFar)}</strong>
            </div>
            <Histogram values={watermarkedSoFar.map((r) => (r as any).g)} />
          </details>
        </div>
      )}

      {isComplete && detectorScore && (
        <div className="detectorpanel">
          <div className="detectorhead">
            <StateLabel state={detectorScore.state} labels={detectorStates} />
            <DetectorNumbers score={detectorScore} />
          </div>
          <label className="wrongkeytoggle">
            <input type="checkbox" checked={useWrongKey} onChange={(e) => setUseWrongKey(e.target.checked)} />
            {wrongKeyLabel}
          </label>
          {useWrongKey && <p className="wrongkeynote">{wrongKeyNote}</p>}
        </div>
      )}

      {isComplete && (
        <div className="stresstests">
          {stressTests.map((t) => (
            <div key={t.id} className="stresstest">
              <button
                type="button"
                className={stressActive === t.id ? 'btn btn-ghost stressbtn-active' : 'btn btn-ghost'}
                onClick={() => runStressTest(t.id)}
              >
                {t.label}
              </button>
              <p className="stresscaption">{t.caption}</p>
              {stressActive === t.id && stressResult && (
                <div className="stresscompare">
                  <div>
                    <p className="wmpanel-label">Before</p>
                    <StateLabel state={stressResult.before.state} labels={detectorStates} />
                    <DetectorNumbers score={stressResult.before} />
                  </div>
                  <div>
                    <p className="wmpanel-label">After</p>
                    <StateLabel state={stressResult.after.state} labels={detectorStates} />
                    <DetectorNumbers score={stressResult.after} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
