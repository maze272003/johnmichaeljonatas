import React, { useRef, useEffect, useState, useCallback } from 'react';

const CANVAS_W = 400;
const CANVAS_H = 600;
const GRAVITY = 0.45;
const JUMP = -7.5;
const PIPE_W = 60;
const PIPE_GAP = 150;
const PIPE_SPEED = 2.5;
const BIRD_SIZE = 24;

export default function FlappyBird() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const gameRef = useRef({ bird: { y: 250, vel: 0 }, pipes: [], score: 0, running: false, animId: null });

  const resetGame = useCallback(() => {
    const g = gameRef.current;
    g.bird = { y: 250, vel: 0 };
    g.pipes = [];
    g.score = 0;
    g.running = true;
    setScore(0);
    setGameOver(false);
    setStarted(true);
  }, []);

  const jump = useCallback(() => {
    if (gameOver) { resetGame(); return; }
    if (!started) { resetGame(); return; }
    gameRef.current.bird.vel = JUMP;
  }, [gameOver, started, resetGame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameCount = 0;

    const draw = () => {
      const g = gameRef.current;
      if (!g.running) { g.animId = requestAnimationFrame(draw); return; }

      ctx.fillStyle = '#70c5ce';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Ground
      ctx.fillStyle = '#ded895';
      ctx.fillRect(0, CANVAS_H - 40, CANVAS_W, 40);
      ctx.fillStyle = '#5cb85c';
      ctx.fillRect(0, CANVAS_H - 40, CANVAS_W, 8);

      // Bird physics
      g.bird.vel += GRAVITY;
      g.bird.y += g.bird.vel;

      // Draw bird
      ctx.fillStyle = '#f7dc6f';
      ctx.beginPath();
      ctx.arc(80, g.bird.y, BIRD_SIZE, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#e74c3c';
      ctx.beginPath();
      ctx.arc(80 + 12, g.bird.y - 6, 6, 0, Math.PI * 2);
      ctx.fill();
      // Eye
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(80 + 10, g.bird.y - 8, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(80 + 12, g.bird.y - 8, 2.5, 0, Math.PI * 2);
      ctx.fill();
      // Beak
      ctx.fillStyle = '#e67e22';
      ctx.beginPath();
      ctx.moveTo(80 + BIRD_SIZE, g.bird.y);
      ctx.lineTo(80 + BIRD_SIZE + 12, g.bird.y + 4);
      ctx.lineTo(80 + BIRD_SIZE, g.bird.y + 8);
      ctx.closePath();
      ctx.fill();
      // Wing
      const wingFlap = Math.sin(frameCount * 0.3) * 6;
      ctx.fillStyle = '#f39c12';
      ctx.beginPath();
      ctx.ellipse(80 - 8, g.bird.y + 4 + wingFlap, 12, 7, -0.3, 0, Math.PI * 2);
      ctx.fill();

      // Spawn pipes
      frameCount++;
      if (frameCount % 100 === 0) {
        const topH = 60 + Math.random() * (CANVAS_H - PIPE_GAP - 140);
        g.pipes.push({ x: CANVAS_W, topH, scored: false });
      }

      // Draw & move pipes
      for (let i = g.pipes.length - 1; i >= 0; i--) {
        const p = g.pipes[i];
        p.x -= PIPE_SPEED;

        // Top pipe
        const grad1 = ctx.createLinearGradient(p.x, 0, p.x + PIPE_W, 0);
        grad1.addColorStop(0, '#2ecc71');
        grad1.addColorStop(0.5, '#27ae60');
        grad1.addColorStop(1, '#1e8449');
        ctx.fillStyle = grad1;
        ctx.fillRect(p.x, 0, PIPE_W, p.topH);
        ctx.fillStyle = '#27ae60';
        ctx.fillRect(p.x - 5, p.topH - 25, PIPE_W + 10, 25);

        // Bottom pipe
        const bottomY = p.topH + PIPE_GAP;
        ctx.fillStyle = grad1;
        ctx.fillRect(p.x, bottomY, PIPE_W, CANVAS_H - bottomY - 40);
        ctx.fillStyle = '#27ae60';
        ctx.fillRect(p.x - 5, bottomY, PIPE_W + 10, 25);

        // Score
        if (!p.scored && p.x + PIPE_W < 80) {
          p.scored = true;
          g.score++;
          setScore(g.score);
        }

        // Collision
        if (
          80 + BIRD_SIZE > p.x && 80 - BIRD_SIZE < p.x + PIPE_W &&
          (g.bird.y - BIRD_SIZE < p.topH || g.bird.y + BIRD_SIZE > bottomY)
        ) {
          g.running = false;
          setGameOver(true);
        }

        if (p.x + PIPE_W < 0) g.pipes.splice(i, 1);
      }

      // Ground/ceiling collision
      if (g.bird.y + BIRD_SIZE > CANVAS_H - 40 || g.bird.y - BIRD_SIZE < 0) {
        g.running = false;
        setGameOver(true);
      }

      // Score display
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 36px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.strokeText(g.score, CANVAS_W / 2, 50);
      ctx.fillText(g.score, CANVAS_W / 2, 50);

      g.animId = requestAnimationFrame(draw);
    };

    const g = gameRef.current;
    g.animId = requestAnimationFrame(draw);

    return () => { if (g.animId) cancelAnimationFrame(g.animId); };
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); } };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [jump]);

  return (
    <div className="game-container" style={{ textAlign: 'center' }}>
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        onClick={jump}
        style={{ cursor: 'pointer', borderRadius: '8px', maxWidth: '100%', height: 'auto' }}
      />
      {!started && !gameOver && (
        <div className="game-overlay">
          <p style={{ fontSize: '1.2rem', color: '#fff' }}>Tap or press Space to start!</p>
        </div>
      )}
      {gameOver && (
        <div className="game-overlay">
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>Game Over!</p>
          <p style={{ color: '#64ffda' }}>Score: {score}</p>
          <p style={{ fontSize: '0.9rem', color: '#ccc' }}>Tap or press Space to restart</p>
        </div>
      )}
    </div>
  );
}
