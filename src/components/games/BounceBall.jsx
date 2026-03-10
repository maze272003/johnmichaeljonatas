import React, { useRef, useEffect, useState, useCallback } from 'react';

const W = 400;
const H = 500;
const BALL_R = 12;
const PLATFORM_H = 12;
const GRAVITY = 0.25;
const BOUNCE_VEL = -9;
const SCROLL_SPEED = 1.5;

export default function BounceBall() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const gameRef = useRef(null);

  const initGame = useCallback(() => {
    const platforms = [];
    for (let i = 0; i < 8; i++) {
      platforms.push({
        x: 30 + Math.random() * (W - 120),
        y: H - 60 - i * 65,
        w: 60 + Math.random() * 40,
      });
    }
    gameRef.current = {
      ball: { x: W / 2, y: H - 100, vx: 0, vy: 0 },
      platforms,
      score: 0,
      running: true,
      keys: {},
      animId: null,
    };
    setScore(0);
    setGameOver(false);
    setStarted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    initGame();

    const draw = () => {
      const g = gameRef.current;
      if (!g) return;
      g.animId = requestAnimationFrame(draw);
      if (!g.running) return;

      // Input
      if (g.keys['ArrowLeft'] || g.keys['a']) g.ball.vx = -4;
      else if (g.keys['ArrowRight'] || g.keys['d']) g.ball.vx = 4;
      else g.ball.vx *= 0.85;

      // Physics
      g.ball.vy += GRAVITY;
      g.ball.x += g.ball.vx;
      g.ball.y += g.ball.vy;

      // Wrap horizontally
      if (g.ball.x < 0) g.ball.x = W;
      if (g.ball.x > W) g.ball.x = 0;

      // Scroll up when ball goes above middle
      if (g.ball.y < H / 2) {
        const shift = H / 2 - g.ball.y;
        g.ball.y = H / 2;
        g.platforms.forEach(p => { p.y += shift; });
        g.score += Math.floor(shift);
        setScore(g.score);
      }

      // Platform collision (only when falling)
      if (g.ball.vy > 0) {
        for (const p of g.platforms) {
          if (
            g.ball.x + BALL_R > p.x && g.ball.x - BALL_R < p.x + p.w &&
            g.ball.y + BALL_R >= p.y && g.ball.y + BALL_R <= p.y + PLATFORM_H + 6
          ) {
            g.ball.vy = BOUNCE_VEL;
            break;
          }
        }
      }

      // Remove off-screen platforms, add new ones
      g.platforms = g.platforms.filter(p => p.y < H + 20);
      while (g.platforms.length < 8) {
        const topY = Math.min(...g.platforms.map(p => p.y));
        g.platforms.push({
          x: 30 + Math.random() * (W - 120),
          y: topY - 55 - Math.random() * 30,
          w: 50 + Math.random() * 50,
        });
      }

      // Fall off bottom
      if (g.ball.y > H + 50) {
        g.running = false;
        setGameOver(true);
      }

      // Draw background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, '#1a0a2e');
      bgGrad.addColorStop(1, '#16213e');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Draw platforms
      for (const p of g.platforms) {
        const pGrad = ctx.createLinearGradient(p.x, p.y, p.x + p.w, p.y);
        pGrad.addColorStop(0, '#64ffda');
        pGrad.addColorStop(1, '#00bfa5');
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.roundRect(p.x, p.y, p.w, PLATFORM_H, 6);
        ctx.fill();
        // Glow
        ctx.shadowColor = '#64ffda';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw ball
      const ballGrad = ctx.createRadialGradient(g.ball.x, g.ball.y, 2, g.ball.x, g.ball.y, BALL_R);
      ballGrad.addColorStop(0, '#ff6b6b');
      ballGrad.addColorStop(1, '#ee5a24');
      ctx.fillStyle = ballGrad;
      ctx.beginPath();
      ctx.arc(g.ball.x, g.ball.y, BALL_R, 0, Math.PI * 2);
      ctx.fill();
      // Ball glow
      ctx.shadowColor = '#ff6b6b';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath();
      ctx.arc(g.ball.x - 3, g.ball.y - 4, 4, 0, Math.PI * 2);
      ctx.fill();

      // Score
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 24px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${g.score}`, 15, 35);
    };

    const g = gameRef.current;
    g.animId = requestAnimationFrame(draw);

    const keyDown = (e) => { if (gameRef.current) gameRef.current.keys[e.key] = true; };
    const keyUp = (e) => { if (gameRef.current) gameRef.current.keys[e.key] = false; };
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    return () => {
      if (gameRef.current?.animId) cancelAnimationFrame(gameRef.current.animId);
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
    };
  }, [initGame]);

  const restart = () => { initGame(); };

  return (
    <div className="game-container" style={{ textAlign: 'center' }}>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{ borderRadius: '8px', maxWidth: '100%', height: 'auto' }}
      />
      {gameOver && (
        <div className="game-overlay">
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>Game Over!</p>
          <p style={{ color: '#64ffda' }}>Score: {score}</p>
          <button onClick={restart} className="game-restart-btn">Play Again</button>
        </div>
      )}
      <p className="game-controls-hint">← → or A/D to move</p>
    </div>
  );
}
