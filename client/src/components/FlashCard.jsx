import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import './FlashCard.css';

const CARDS = ['verse', 'quote', 'affirmation'];

function FlashCard({ verse, quote, affirmation, loading, onRefresh }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [flipped, setFlipped] = useState(false);

  const goNext = () => {
    setDirection(1);
    setFlipped(false);
    setIndex(i => (i + 1) % CARDS.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setFlipped(false);
    setIndex(i => (i - 1 + CARDS.length) % CARDS.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  const variants = {
    enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -300 : 300, opacity: 0 })
  };

  const renderFront = () => {
    if (loading) return <div className="card-loading"><div className="spinner" /></div>;
    const type = CARDS[index];
    if (type === 'verse') return (
      <>
        <span className="card-label">📖 Bible Verse</span>
        <p className="card-reference">{verse?.reference}</p>
        <p className="card-text">{verse?.text}</p>
      </>
    );
    if (type === 'quote') return (
      <>
        <span className="card-label">💬 Daily Quote</span>
        <p className="card-text">"{quote?.quote}"</p>
        <p className="card-author">— {quote?.author}</p>
      </>
    );
    if (type === 'affirmation') return (
      <>
        <span className="card-label">✨ Affirmation</span>
        <p className="card-affirmation">{affirmation}</p>
      </>
    );
  };

  return (
    <div className="flashcard-wrapper" {...handlers}>
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={index}
          className={`flashcard ${flipped ? 'flipped' : ''}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          onClick={() => setFlipped(f => !f)}
        >
          <div className="card-inner">
            <div className="card-front">{renderFront()}</div>
            <div className="card-back">
              <span className="card-label">🙏 Reflection</span>
              <p className="card-text">Take a moment to meditate on this. Let it guide your day.</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="card-dots">
        {CARDS.map((_, i) => (
          <span key={i} className={`dot ${i === index ? 'active' : ''}`} onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }} />
        ))}
      </div>

      <div className="card-controls">
        <button className="ctrl-btn" onClick={goPrev}>← Prev</button>
        <button className="ctrl-btn refresh" onClick={onRefresh}>↻ New</button>
        <button className="ctrl-btn" onClick={goNext}>Next →</button>
      </div>

      <p className="swipe-hint">Swipe or tap card to flip</p>
    </div>
  );
}

export default FlashCard;
