import React, { useRef, useEffect, useState, useCallback } from 'react';

const W = 400;
const H = 400;
const CELL = 20;
const COLS = W / CELL;
const ROWS = H / CELL;

function SnakeCanvas({ onGameOver, onScoreChange }) {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const g = {
      snake: [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }],
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: { x: 15, y: 10 },
      score: 0,
      running: true,
    };
    gameRef.current = g;

    const spawnFood = () => {
      let pos;
      do {
        pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
      } while (g.snake.some(s => s.x === pos.x && s.y === pos.y));
      g.food = pos;
    };

    const tick = () => {
      if (!g.running) return;

      g.dir = g.nextDir;
      const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y };

      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        g.running = false;
        onGameOver(g.score);
        return;
      }

      if (g.snake.some(s => s.x === head.x && s.y === head.y)) {
        g.running = false;
        onGameOver(g.score);
        return;
      }

      g.snake.unshift(head);

      if (head.x === g.food.x && head.y === g.food.y) {
        g.score += 10;
        onScoreChange(g.score);
        spawnFood();
      } else {
        g.snake.pop();
      }

      ctx.fillStyle = '#0a192f';
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = 'rgba(100,255,218,0.05)';
      for (let i = 0; i < COLS; i++) {
        ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, H); ctx.stroke();
      }
      for (let i = 0; i < ROWS; i++) {
        ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(W, i * CELL); ctx.stroke();
      }

      g.snake.forEach((seg, i) => {
        const alpha = 1 - i * 0.03;
        if (i === 0) {
          ctx.fillStyle = '#64ffda';
        } else {
          ctx.fillStyle = `rgba(100,255,218,${Math.max(alpha, 0.3)})`;
        }
        ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
        if (i === 0) {
          ctx.fillStyle = '#0a192f';
          const eyeOffX = g.dir.x * 4;
          const eyeOffY = g.dir.y * 4;
          ctx.beginPath();
          ctx.arc(seg.x * CELL + CELL / 2 - 3 + eyeOffX, seg.y * CELL + CELL / 2 - 3 + eyeOffY, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(seg.x * CELL + CELL / 2 + 3 + eyeOffX, seg.y * CELL + CELL / 2 + 3 + eyeOffY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.fillStyle = '#e74c3c';
      ctx.beginPath();
      ctx.arc(g.food.x * CELL + CELL / 2, g.food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = '#e74c3c';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 18px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${g.score}`, 10, 25);
    };

    const interval = setInterval(tick, 120);

    const handleKey = (e) => {
      const dirs = {
        ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 }, s: { x: 0, y: 1 },
        a: { x: -1, y: 0 }, d: { x: 1, y: 0 },
      };
      const nd = dirs[e.key];
      if (nd && (nd.x + g.dir.x !== 0 || nd.y + g.dir.y !== 0)) {
        g.nextDir = nd;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKey);
    };
  }, [onGameOver, onScoreChange]);

  return (
    <canvas ref={canvasRef} width={W} height={H} style={{ borderRadius: '8px', maxWidth: '100%', height: 'auto' }} />
  );
}

export default function SnakeGame() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const handleGameOver = useCallback((finalScore) => {
    setScore(finalScore);
    setGameOver(true);
  }, []);

  const handleScoreChange = useCallback((newScore) => {
    setScore(newScore);
  }, []);

  const restart = () => {
    setScore(0);
    setGameOver(false);
    setGameKey(k => k + 1);
  };

  return (
    <div className="game-container" style={{ textAlign: 'center' }}>
      <SnakeCanvas key={gameKey} onGameOver={handleGameOver} onScoreChange={handleScoreChange} />
      {gameOver && (
        <div className="game-overlay">
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>Game Over!</p>
          <p style={{ color: '#64ffda' }}>Score: {score}</p>
          <button onClick={restart} className="game-restart-btn">Play Again</button>
        </div>
      )}
      <p className="game-controls-hint">Arrow keys or WASD to move</p>
    </div>
  );
}
