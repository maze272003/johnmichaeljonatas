import React, { useRef, useEffect, useState, useCallback } from 'react';

const W = 400;
const H = 400;
const CELL = 20;
const COLS = W / CELL;
const ROWS = H / CELL;

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameRef = useRef(null);

  const initGame = useCallback(() => {
    gameRef.current = {
      snake: [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }],
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: { x: 15, y: 10 },
      score: 0,
      running: true,
      intervalId: null,
    };
    setScore(0);
    setGameOver(false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    initGame();

    const spawnFood = () => {
      const g = gameRef.current;
      let pos;
      do {
        pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
      } while (g.snake.some(s => s.x === pos.x && s.y === pos.y));
      g.food = pos;
    };

    const tick = () => {
      const g = gameRef.current;
      if (!g || !g.running) return;

      g.dir = g.nextDir;
      const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y };

      // Wall collision
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        g.running = false;
        setGameOver(true);
        return;
      }

      // Self collision
      if (g.snake.some(s => s.x === head.x && s.y === head.y)) {
        g.running = false;
        setGameOver(true);
        return;
      }

      g.snake.unshift(head);

      // Eat food
      if (head.x === g.food.x && head.y === g.food.y) {
        g.score += 10;
        setScore(g.score);
        spawnFood();
      } else {
        g.snake.pop();
      }

      // Draw
      ctx.fillStyle = '#0a192f';
      ctx.fillRect(0, 0, W, H);

      // Grid (subtle)
      ctx.strokeStyle = 'rgba(100,255,218,0.05)';
      for (let i = 0; i < COLS; i++) {
        ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, H); ctx.stroke();
      }
      for (let i = 0; i < ROWS; i++) {
        ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(W, i * CELL); ctx.stroke();
      }

      // Snake
      g.snake.forEach((seg, i) => {
        const alpha = 1 - i * 0.03;
        if (i === 0) {
          ctx.fillStyle = '#64ffda';
        } else {
          ctx.fillStyle = `rgba(100,255,218,${Math.max(alpha, 0.3)})`;
        }
        ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
        if (i === 0) {
          // Eyes
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

      // Food
      ctx.fillStyle = '#e74c3c';
      ctx.beginPath();
      ctx.arc(g.food.x * CELL + CELL / 2, g.food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = '#e74c3c';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Score
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 18px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${g.score}`, 10, 25);
    };

    const interval = setInterval(tick, 120);
    gameRef.current.intervalId = interval;

    const handleKey = (e) => {
      const g = gameRef.current;
      if (!g) return;
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
  }, [initGame]);

  const restart = () => {
    if (gameRef.current?.intervalId) clearInterval(gameRef.current.intervalId);
    initGame();
    // Re-create interval
    const tick = () => {}; // Will be handled by re-mount
    window.location.hash = '#games'; // Force re-render trick
    window.location.hash = '#games';
  };

  return (
    <div className="game-container" style={{ textAlign: 'center' }}>
      <canvas ref={canvasRef} width={W} height={H} style={{ borderRadius: '8px', maxWidth: '100%', height: 'auto' }} />
      {gameOver && (
        <div className="game-overlay">
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>Game Over!</p>
          <p style={{ color: '#64ffda' }}>Score: {score}</p>
          <p style={{ fontSize: '0.9rem', color: '#ccc' }}>Refresh game to restart</p>
        </div>
      )}
      <p className="game-controls-hint">Arrow keys or WASD to move</p>
    </div>
  );
}
