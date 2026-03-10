import React, { useState, useEffect, useRef, useCallback } from 'react';

const GRID = 3;
const TOTAL_MOLES = GRID * GRID;
const GAME_DURATION = 30;

export default function WhackAMole() {
  const [moles, setMoles] = useState(Array(TOTAL_MOLES).fill(false));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [started, setStarted] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('whackHighScore');
    return saved ? parseInt(saved) : 0;
  });
  const timersRef = useRef([]);

  const spawnMole = useCallback(() => {
    const idx = Math.floor(Math.random() * TOTAL_MOLES);
    setMoles(prev => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
    const hideTimer = setTimeout(() => {
      setMoles(prev => {
        const next = [...prev];
        next[idx] = false;
        return next;
      });
    }, 800 + Math.random() * 600);
    timersRef.current.push(hideTimer);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setMoles(Array(TOTAL_MOLES).fill(false));
    setStarted(true);
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    if (!started || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    const moleTimer = setInterval(spawnMole, 600 + Math.random() * 400);
    return () => {
      clearInterval(timer);
      clearInterval(moleTimer);
    };
  }, [started, timeLeft, spawnMole]);

  useEffect(() => {
    if (timeLeft <= 0 && started) {
      setStarted(false);
      setMoles(Array(TOTAL_MOLES).fill(false));
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('whackHighScore', score.toString());
      }
    }
  }, [timeLeft, started, score, highScore]);

  const whack = (idx) => {
    if (!moles[idx] || !started) return;
    setMoles(prev => {
      const next = [...prev];
      next[idx] = false;
      return next;
    });
    setScore(s => s + 1);
  };

  const gameEnded = !started && timeLeft <= 0;

  return (
    <div className="game-container" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem', fontFamily: 'Fira Code, monospace', fontSize: '0.9rem' }}>
        <span style={{ color: '#64ffda' }}>Score: {score}</span>
        <span style={{ color: timeLeft <= 5 ? '#e74c3c' : '#f39c12' }}>Time: {timeLeft}s</span>
        <span style={{ color: '#8892b0' }}>Best: {highScore}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID}, 90px)`, gap: '10px', justifyContent: 'center' }}>
        {moles.map((isUp, i) => (
          <button
            key={i}
            onClick={() => whack(i)}
            style={{
              width: '90px',
              height: '90px',
              fontSize: '2.5rem',
              background: isUp ? 'rgba(100,255,218,0.1)' : 'var(--secondary-color, #112240)',
              border: `2px solid ${isUp ? '#64ffda' : 'rgba(100,255,218,0.08)'}`,
              borderRadius: '50%',
              cursor: started ? 'pointer' : 'default',
              transition: 'all 0.15s ease',
              transform: isUp ? 'scale(1.1)' : 'scale(1)',
              userSelect: 'none',
            }}
          >
            {isUp ? '🐹' : '🕳️'}
          </button>
        ))}
      </div>

      {!started && !gameEnded && (
        <div style={{ marginTop: '1.5rem' }}>
          <button onClick={startGame} className="game-restart-btn">Start Game</button>
        </div>
      )}

      {gameEnded && (
        <div style={{ marginTop: '1rem' }}>
          <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>
            Time&apos;s up! You whacked {score} moles! 🎯
          </p>
          <button onClick={startGame} className="game-restart-btn">Play Again</button>
        </div>
      )}

      {started && <p className="game-controls-hint">Click the moles before they hide!</p>}
    </div>
  );
}
