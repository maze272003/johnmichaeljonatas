import React, { useState, useEffect, useCallback, useRef } from 'react';

const COLORS = [
  { name: 'Red', hex: '#e74c3c' },
  { name: 'Blue', hex: '#3498db' },
  { name: 'Green', hex: '#2ecc71' },
  { name: 'Yellow', hex: '#f1c40f' },
  { name: 'Purple', hex: '#9b59b6' },
  { name: 'Orange', hex: '#e67e22' },
  { name: 'Pink', hex: '#e91e8a' },
  { name: 'Cyan', hex: '#1abc9c' },
];

export default function ColorMatch() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [started, setStarted] = useState(false);
  const [displayColor, setDisplayColor] = useState(null);
  const [textColor, setTextColor] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('colorMatchHigh');
    return saved ? parseInt(saved) : 0;
  });
  const timerRef = useRef(null);

  const generateRound = useCallback(() => {
    const display = COLORS[Math.floor(Math.random() * COLORS.length)];
    const text = COLORS[Math.floor(Math.random() * COLORS.length)];
    // Generate 4 options, one of which is the correct answer (the displayed color hex)
    const correctAnswer = display;
    const opts = [correctAnswer];
    while (opts.length < 4) {
      const rand = COLORS[Math.floor(Math.random() * COLORS.length)];
      if (!opts.find(o => o.name === rand.name)) opts.push(rand);
    }
    // Shuffle options
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    setDisplayColor(display);
    setTextColor(text);
    setOptions(opts);
    setFeedback(null);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(20);
    setStarted(true);
    generateRound();
  }, [generateRound]);

  useEffect(() => {
    if (!started || timeLeft <= 0) return;
    timerRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [started, timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0 && started) {
      setStarted(false);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('colorMatchHigh', score.toString());
      }
    }
  }, [timeLeft, started, score, highScore]);

  const handleAnswer = (color) => {
    if (!started) return;
    if (color.name === displayColor.name) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
    setTimeout(generateRound, 300);
  };

  const gameEnded = !started && timeLeft <= 0;

  return (
    <div className="game-container" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', fontFamily: 'Fira Code, monospace', fontSize: '0.9rem' }}>
        <span style={{ color: '#64ffda' }}>Score: {score}</span>
        <span style={{ color: timeLeft <= 5 ? '#e74c3c' : '#f39c12' }}>Time: {timeLeft}s</span>
        <span style={{ color: '#8892b0' }}>Best: {highScore}</span>
      </div>

      {started && displayColor && textColor && (
        <>
          <p style={{ fontSize: '0.9rem', color: '#8892b0', marginBottom: '0.5rem' }}>
            What COLOR is the text displayed in?
          </p>
          <div style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: displayColor.hex,
            marginBottom: '1.5rem',
            textShadow: '0 0 20px rgba(0,0,0,0.3)',
            transition: 'all 0.2s',
            minHeight: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {textColor.name}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 140px)', gap: '10px', justifyContent: 'center' }}>
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                style={{
                  padding: '0.75rem',
                  background: 'var(--secondary-color, #112240)',
                  border: `2px solid ${feedback === 'correct' && opt.name === displayColor.name ? '#2ecc71' : 'rgba(100,255,218,0.15)'}`,
                  borderRadius: '8px',
                  color: opt.hex,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </>
      )}

      {!started && !gameEnded && (
        <div style={{ marginTop: '2rem' }}>
          <p style={{ color: '#8892b0', marginBottom: '1rem' }}>
            Match the text COLOR (not the word!) as fast as you can!
          </p>
          <button onClick={startGame} className="game-restart-btn">Start Game</button>
        </div>
      )}

      {gameEnded && (
        <div style={{ marginTop: '1rem' }}>
          <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>
            Time&apos;s up! Score: {score} 🎨
          </p>
          <button onClick={startGame} className="game-restart-btn">Play Again</button>
        </div>
      )}
    </div>
  );
}
