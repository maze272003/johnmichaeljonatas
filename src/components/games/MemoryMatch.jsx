import React, { useState, useEffect, useRef } from 'react';

const emojis = ['🎮', '🚀', '💻', '🎨', '🔥', '⚡', '🌟', '🎯'];
const allCards = [...emojis, ...emojis];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryMatch() {
  const [cards, setCards] = useState(() => shuffle(allCards));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('memoryBest');
    return saved ? parseInt(saved) : null;
  });
  const lockRef = useRef(false);

  const handleFlip = (i) => {
    if (lockRef.current || flipped.includes(i) || matched.includes(i)) return;

    const newFlipped = [...flipped, i];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      lockRef.current = true;

      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setTimeout(() => {
          setMatched(prev => [...prev, newFlipped[0], newFlipped[1]]);
          setFlipped([]);
          lockRef.current = false;
        }, 400);
      } else {
        setTimeout(() => {
          setFlipped([]);
          lockRef.current = false;
        }, 800);
      }
    }
  };

  useEffect(() => {
    if (matched.length === allCards.length) {
      if (!bestScore || moves < bestScore) {
        setBestScore(moves);
        localStorage.setItem('memoryBest', moves.toString());
      }
    }
  }, [matched, moves, bestScore]);

  const reset = () => {
    setCards(shuffle(allCards));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    lockRef.current = false;
  };

  const won = matched.length === allCards.length;

  return (
    <div className="game-container" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem', fontFamily: 'Fira Code, monospace', fontSize: '0.9rem' }}>
        <span style={{ color: '#64ffda' }}>Moves: {moves}</span>
        {bestScore && <span style={{ color: '#f39c12' }}>Best: {bestScore}</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 70px)', gap: '8px', justifyContent: 'center' }}>
        {cards.map((card, i) => {
          const isFlipped = flipped.includes(i) || matched.includes(i);
          const isMatched = matched.includes(i);
          return (
            <button
              key={i}
              onClick={() => handleFlip(i)}
              style={{
                width: '70px',
                height: '70px',
                fontSize: '1.8rem',
                background: isMatched ? 'rgba(100,255,218,0.1)' : isFlipped ? 'var(--secondary-color, #112240)' : 'var(--secondary-color, #112240)',
                border: `2px solid ${isMatched ? '#64ffda' : isFlipped ? 'rgba(100,255,218,0.3)' : 'rgba(100,255,218,0.08)'}`,
                borderRadius: '8px',
                cursor: isFlipped ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                opacity: isMatched ? 0.7 : 1,
              }}
            >
              {isFlipped ? card : '❓'}
            </button>
          );
        })}
      </div>

      {won && (
        <div style={{ marginTop: '1rem' }}>
          <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>🎉 You Won in {moves} moves!</p>
          <button onClick={reset} className="game-restart-btn">Play Again</button>
        </div>
      )}

      {!won && <p className="game-controls-hint">Click cards to find matching pairs</p>}
    </div>
  );
}
