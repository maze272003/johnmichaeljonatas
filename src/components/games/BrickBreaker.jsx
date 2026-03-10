import React, { useRef, useEffect, useState, useCallback } from 'react';

const W = 480;
const H = 500;
const COLS = 10;
const BRICK_ROWS = 6;
const BRICK_W = W / COLS - 4;
const BRICK_H = 18;
const PADDLE_W = 80;
const PADDLE_H = 12;
const BALL_R = 6;

export default function BrickBreaker() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const gameRef = useRef(null);

  const initGame = useCallback(() => {
    const bricks = [];
    const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6'];
    for (let r = 0; r < BRICK_ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        bricks.push({
          x: c * (BRICK_W + 4) + 2,
          y: r * (BRICK_H + 4) + 50,
          w: BRICK_W,
          h: BRICK_H,
          alive: true,
          color: colors[r],
          points: (BRICK_ROWS - r) * 10,
        });
      }
    }
    gameRef.current = {
      ball: { x: W / 2, y: H - 60, vx: 3.5, vy: -3.5 },
      paddle: { x: W / 2 - PADDLE_W / 2 },
      bricks,
      score: 0,
      lives: 3,
      running: true,
      keys: {},
      animId: null,
    };
    setScore(0);
    setLives(3);
    setGameOver(false);
    setWon(false);
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
      if (g.keys['ArrowLeft'] || g.keys['a']) g.paddle.x = Math.max(0, g.paddle.x - 6);
      if (g.keys['ArrowRight'] || g.keys['d']) g.paddle.x = Math.min(W - PADDLE_W, g.paddle.x + 6);

      // Ball physics
      g.ball.x += g.ball.vx;
      g.ball.y += g.ball.vy;

      // Wall bounce
      if (g.ball.x - BALL_R < 0 || g.ball.x + BALL_R > W) g.ball.vx *= -1;
      if (g.ball.y - BALL_R < 0) g.ball.vy *= -1;

      // Bottom - lose life
      if (g.ball.y > H) {
        g.lives--;
        setLives(g.lives);
        if (g.lives <= 0) {
          g.running = false;
          setGameOver(true);
          return;
        }
        g.ball = { x: W / 2, y: H - 60, vx: 3.5 * (Math.random() > 0.5 ? 1 : -1), vy: -3.5 };
      }

      // Paddle collision
      if (
        g.ball.y + BALL_R >= H - 35 && g.ball.y + BALL_R <= H - 20 &&
        g.ball.x > g.paddle.x && g.ball.x < g.paddle.x + PADDLE_W
      ) {
        g.ball.vy = -Math.abs(g.ball.vy);
        // Angle based on hit position
        const hitPos = (g.ball.x - g.paddle.x) / PADDLE_W;
        g.ball.vx = (hitPos - 0.5) * 8;
      }

      // Brick collision
      let allDestroyed = true;
      for (const brick of g.bricks) {
        if (!brick.alive) continue;
        allDestroyed = false;
        if (
          g.ball.x + BALL_R > brick.x && g.ball.x - BALL_R < brick.x + brick.w &&
          g.ball.y + BALL_R > brick.y && g.ball.y - BALL_R < brick.y + brick.h
        ) {
          brick.alive = false;
          g.ball.vy *= -1;
          g.score += brick.points;
          setScore(g.score);
        }
      }

      if (allDestroyed) {
        g.running = false;
        setWon(true);
      }

      // Draw
      ctx.fillStyle = '#0a192f';
      ctx.fillRect(0, 0, W, H);

      // Bricks
      for (const brick of g.bricks) {
        if (!brick.alive) continue;
        ctx.fillStyle = brick.color;
        ctx.beginPath();
        ctx.roundRect(brick.x, brick.y, brick.w, brick.h, 3);
        ctx.fill();
        // Highlight
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(brick.x, brick.y, brick.w, brick.h / 3);
      }

      // Paddle
      const pGrad = ctx.createLinearGradient(g.paddle.x, 0, g.paddle.x + PADDLE_W, 0);
      pGrad.addColorStop(0, '#64ffda');
      pGrad.addColorStop(1, '#00bfa5');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.roundRect(g.paddle.x, H - 35, PADDLE_W, PADDLE_H, 6);
      ctx.fill();

      // Ball
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#64ffda';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(g.ball.x, g.ball.y, BALL_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // HUD
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${g.score}`, 10, 25);
      ctx.textAlign = 'right';
      ctx.fillText(`Lives: ${'❤️'.repeat(g.lives)}`, W - 10, 25);
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
      <canvas ref={canvasRef} width={W} height={H} style={{ borderRadius: '8px', maxWidth: '100%', height: 'auto' }} />
      {(gameOver || won) && (
        <div className="game-overlay">
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
            {won ? '🎉 You Won!' : 'Game Over!'}
          </p>
          <p style={{ color: '#64ffda' }}>Score: {score}</p>
          <button onClick={restart} className="game-restart-btn">Play Again</button>
        </div>
      )}
      <p className="game-controls-hint">← → or A/D to move paddle</p>
    </div>
  );
}
