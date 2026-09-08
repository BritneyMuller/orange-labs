import { useEffect, useMemo, useRef, useState } from 'react';
import synonyms from '../../data/synonyms.json';
import { displayOf, runWatermark, type Dictionary, type WordRecord } from '../../lib/watermark';

const dictionary = synonyms as Dictionary;

const INITIAL_DELAY_MS = 800;
const STEP_DELAY_MS = 2200;

interface Props {
  sentence: string;
  demoKey: string;
  payoff: string;
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function captionFor(record: WordRecord): string {
  if (record.kind === 'fixed') {
    return record.reason === 'masked'
      ? `This exact phrase already appeared earlier, so it's skipped here to avoid a repeating pattern.`
      : `There's no natural substitute for this word here, so it carries no signal.`;
  }
  const others = record.candidates.filter((c) => c.word !== record.winner).map((c) => c.word);
  return `Claude could have chosen ${others.map((o) => `“${o}”`).join(', ')} instead. This specific choice is part of the watermark.`;
}

function announceFor(record: WordRecord): string {
  const word = displayOf(record);
  return record.kind === 'fixed' ? `${word}, fixed word` : `${word}, tournament word. ${captionFor(record)}`;
}

export default function WordExplainer({ sentence, demoKey, payoff }: Props) {
  const { records, stream, tournamentCount, fixedCount } = useMemo(() => {
    const result = runWatermark(sentence, demoKey, dictionary);
    const tournamentCount = result.records.filter((r) => r.kind === 'watermarked').length;
    return { ...result, tournamentCount, fixedCount: result.records.length - tournamentCount };
  }, [sentence, demoKey]);

  const [revealedCount, setRevealedCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [liveMessage, setLiveMessage] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function stop() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function play() {
    stop();
    setRevealedCount(0);
    setActiveIndex(-1);
    setLiveMessage('');

    if (prefersReducedMotion()) {
      setRevealedCount(records.length);
      setActiveIndex(records.length - 1);
      return;
    }

    let i = 0;
    const step = () => {
      i++;
      setRevealedCount(i);
      setActiveIndex(i - 1);
      const record = records[i - 1];
      if (record) setLiveMessage(announceFor(record));
      if (i < records.length) timerRef.current = setTimeout(step, STEP_DELAY_MS);
    };
    timerRef.current = setTimeout(step, INITIAL_DELAY_MS);
  }

  useEffect(() => {
    play();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentence, demoKey]);

  function handleWordClick(recordIndex: number) {
    if (recordIndex >= revealedCount) return;
    stop();
    setActiveIndex(recordIndex);
    setLiveMessage(announceFor(records[recordIndex]));
  }

  const isComplete = revealedCount === records.length && records.length > 0;
  const activeRecord = activeIndex >= 0 ? records[activeIndex] : null;

  return (
    <div className="wex">
      <p className="wex-sentence">
        {stream.map((item, i) =>
          item.kind === 'other' ? (
            <span key={i}>{item.text}</span>
          ) : (
            (() => {
              const record = records[item.recordIndex];
              const revealed = item.recordIndex < revealedCount;
              const active = item.recordIndex === activeIndex;
              const cls = ['wex-word'];
              if (revealed) cls.push(record.kind === 'watermarked' ? 'wex-word-tournament' : 'wex-word-fixed');
              else cls.push('wex-word-pending');
              if (active) cls.push('wex-word-active');
              return (
                <button
                  key={i}
                  type="button"
                  className={cls.join(' ')}
                  disabled={!revealed}
                  onClick={() => handleWordClick(item.recordIndex)}
                >
                  {displayOf(record)}
                </button>
              );
            })()
          ),
        )}
      </p>

      <p className="visually-hidden" aria-live="polite">
        {liveMessage}
      </p>

      <div className="wex-caption">
        {activeRecord ? (
          <>
            <span className={activeRecord.kind === 'watermarked' ? 'wex-tag wex-tag-tournament' : 'wex-tag wex-tag-fixed'}>
              {activeRecord.kind === 'watermarked' ? 'Tournament word' : 'Fixed word'}
            </span>
            <span>{captionFor(activeRecord)}</span>
          </>
        ) : (
          <span className="wex-caption-idle">Watch the sentence appear, one word at a time.</span>
        )}
      </div>

      {isComplete && (
        <div className="wex-summary">
          <div className="wex-legend">
            <span>
              <i className="wex-dot wex-dot-tournament" aria-hidden="true" /> Tournament word
            </span>
            <span>
              <i className="wex-dot wex-dot-fixed" aria-hidden="true" /> Fixed word
            </span>
          </div>
          <p className="wex-tally">
            {tournamentCount} tournament word{tournamentCount === 1 ? '' : 's'} &middot; {fixedCount} fixed word
            {fixedCount === 1 ? '' : 's'} in this sentence
          </p>
          <p className="wex-payoff">{payoff}</p>
        </div>
      )}

      <div className="wex-actions">
        <button type="button" className="btn btn-ghost" onClick={play}>
          Replay
        </button>
      </div>
    </div>
  );
}
