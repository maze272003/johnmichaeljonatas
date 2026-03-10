import React, { useRef, useEffect, useState, useCallback } from 'react';

const W = 500;
const H = 400;
const PADDLE_W = 10;
const PADDLE_H = 70;
const BALL_R = 8;
const AI_SPEED = 3.5;

export default function Pong() {
  const canvasRef = useRef(null);
  const [scores, setScores] = useState({ player: 0, ai: 0 });
  const gameRef = useRef(null);

  const initGame = useCallback(() => {
    gameRef.current = {
      ball: { x: W / 2, y: H / 2, vx: 4, vy: 3 },
      player: { y: H / 2 - PADDLE_H / 2 },
      ai: { y: H / 2 - PADDLE_H / 2 },
      scores: { player: 0, ai: 0 },
      keys: {},
      running: true,
      animId: null,
    };
    setScores({ player: 0, ai: 0 });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    initGame();

    const resetBall = (dir) => {
      const g = gameRef.current;
      g.ball.x = W / 2;
      g.ball.y = H / 2;
      g.ball.vx = 4 * dir;
      g.ball.vy = (Math.random() - 0.5) * 6;
    };

    const draw = () => {
      const g = gameRef.current;
      if (!g) return;
      g.animId = requestAnimationFrame(draw);

      // Player input
      if (g.keys['ArrowUp'] || g.keys['w']) g.player.y = Math.max(0, g.player.y - 5);
      if (g.keys['ArrowDown'] || g.keys['s']) g.player.y = Math.min(H - PADDLE_H, g.player.y + 5);

      // AI
      const aiCenter = g.ai.y + PADDLE_H / 2;
      if (aiCenter < g.ball.y - 10) g.ai.y = Math.min(H - PADDLE_H, g.ai.y + AI_SPEED);
      if (aiCenter > g.ball.y + 10) g.ai.y = Math.max(0, g.ai.y - AI_SPEED);

      // Ball movement
      g.ball.x += g.ball.vx;
      g.ball.y += g.ball.vy;

      // Top/bottom bounce
      if (g.ball.y - BALL_R < 0 || g.ball.y + BALL_R > H) g.ball.vy *= -1;

      // Player paddle collision
      if (
        g.ball.x - BALL_R < 25 + PADDLE_W &&
        g.ball.x - BALL_R > 25 &&
        g.ball.y > g.player.y && g.ball.y < g.player.y + PADDLE_H
      ) {
        g.ball.vx = Math.abs(g.ball.vx) * 1.05;
        g.ball.vy += (g.ball.y - (g.player.y + PADDLE_H / 2)) * 0.15;
      }

      // AI paddle collision
      if (
        g.ball.x + BALL_R > W - 25 - PADDLE_W &&
        g.ball.x + BALL_R < W - 25 &&
        g.ball.y > g.ai.y && g.ball.y < g.ai.y + PADDLE_H
      ) {
        g.ball.vx = -Math.abs(g.ball.vx) * 1.05;
        g.ball.vy += (g.ball.y - (g.ai.y + PADDLE_H / 2)) * 0.15;
      }

      // Scoring
      if (g.ball.x < 0) {
        g.scores.ai++;
        setScores({ ...g.scores });
        resetBall(1);
      }
      if (g.ball.x > W) {
        g.scores.player++;
        setScores({ ...g.scores });
        resetBall(-1);
      }

      // Clamp ball speed
      const speed = Math.sqrt(g.ball.vx ** 2 + g.ball.vy ** 2);
      if (speed > 12) {
        g.ball.vx *= 12 / speed;
        g.ball.vy *= 12 / speed;
      }

      // Draw
      ctx.fillStyle = '#0a192f';
      ctx.fillRect(0, 0, W, H);

      // Center line
      ctx.setLineDash([5, 10]);
      ctx.strokeStyle = 'rgba(100,255,218,0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(W / 2, 0);
      ctx.lineTo(W / 2, H);
      ctx.stroke();
      ctx.setLineDash([]);

      // Player paddle
      const pGrad = ctx.createLinearGradient(25, g.player.y, 25 + PADDLE_W, g.player.y);
      pGrad.addColorStop(0, '#64ffda');
      pGrad.addColorStop(1, '#00bfa5');
      ctx.fillStyle = pGrad;
      ctx.fillRect(25, g.player.y, PADDLE_W, PADDLE_H);

      // AI paddle
      const aGrad = ctx.createLinearGradient(W - 25 - PADDLE_W, g.ai.y, W - 25, g.ai.y);
      aGrad.addColorStop(0, '#e74c3c');
      aGrad.addColorStop(1, '#c0392b');
      ctx.fillStyle = aGrad;
      ctx.fillRect(W - 25 - PADDLE_W, g.ai.y, PADDLE_W, PADDLE_H);

      // Ball
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#64ffda';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(g.ball.x, g.ball.y, BALL_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Trail
      ctx.fillStyle = 'rgba(100,255,218,0.1)';
      ctx.beginPath();
      ctx.arc(g.ball.x - g.ball.vx * 2, g.ball.y - g.ball.vy * 2, BALL_R - 2, 0, Math.PI * 2);
      ctx.fill();

      // Scores
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = 'bold 48px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(g.scores.player, W / 4, 60);
      ctx.fillText(g.scores.ai, (W * 3) / 4, 60);
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

  return (
    <div className="game-container" style={{ textAlign: 'center' }}>
      <canvas ref={canvasRef} width={W} height={H} style={{ borderRadius: '8px', maxWidth: '100%', height: 'auto' }} />
      <p className="game-controls-hint">↑ ↓ or W/S to move paddle</p>
    </div>
  );
}
