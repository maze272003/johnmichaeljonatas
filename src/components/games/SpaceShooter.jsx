import React, { useRef, useEffect, useState, useCallback } from 'react';

const W = 400;
const H = 550;
const PLAYER_W = 30;
const PLAYER_H = 20;
const BULLET_SPEED = 7;
const ENEMY_ROWS = 4;
const ENEMY_COLS = 8;
const ENEMY_W = 28;
const ENEMY_H = 20;

export default function SpaceShooter() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [wave, setWave] = useState(1);
  const gameRef = useRef(null);

  const initGame = useCallback((waveNum = 1) => {
    const enemies = [];
    for (let r = 0; r < ENEMY_ROWS; r++) {
      for (let c = 0; c < ENEMY_COLS; c++) {
        enemies.push({
          x: 40 + c * 42,
          y: 40 + r * 35,
          alive: true,
          type: r < 2 ? 'tough' : 'normal',
        });
      }
    }
    gameRef.current = {
      player: { x: W / 2 },
      bullets: [],
      enemyBullets: [],
      enemies,
      enemyDir: 1,
      enemySpeed: 0.3 + waveNum * 0.15,
      score: waveNum === 1 ? 0 : (gameRef.current?.score || 0),
      lives: waveNum === 1 ? 3 : (gameRef.current?.lives || 3),
      keys: {},
      running: true,
      lastShot: 0,
      animId: null,
      stars: Array.from({ length: 50 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        speed: 0.2 + Math.random() * 0.8,
        size: Math.random() * 2,
      })),
    };
    if (waveNum === 1) {
      setScore(0);
      setLives(3);
    }
    setGameOver(false);
    setWon(false);
    setWave(waveNum);
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
      if (g.keys['ArrowLeft'] || g.keys['a']) g.player.x = Math.max(PLAYER_W, g.player.x - 5);
      if (g.keys['ArrowRight'] || g.keys['d']) g.player.x = Math.min(W - PLAYER_W, g.player.x + 5);
      if (g.keys[' '] || g.keys['ArrowUp']) {
        const now = Date.now();
        if (now - g.lastShot > 250) {
          g.bullets.push({ x: g.player.x, y: H - 45 });
          g.lastShot = now;
        }
      }

      // Draw background
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, W, H);

      // Stars
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      g.stars.forEach(s => {
        s.y += s.speed;
        if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
        ctx.fillRect(s.x, s.y, s.size, s.size);
      });

      // Move bullets
      g.bullets = g.bullets.filter(b => {
        b.y -= BULLET_SPEED;
        return b.y > 0;
      });

      // Enemy bullets
      g.enemyBullets = g.enemyBullets.filter(b => {
        b.y += 3.5;
        return b.y < H;
      });

      // Random enemy shooting
      if (Math.random() < 0.015) {
        const alive = g.enemies.filter(e => e.alive);
        if (alive.length > 0) {
          const shooter = alive[Math.floor(Math.random() * alive.length)];
          g.enemyBullets.push({ x: shooter.x + ENEMY_W / 2, y: shooter.y + ENEMY_H });
        }
      }

      // Move enemies
      let hitEdge = false;
      for (const e of g.enemies) {
        if (!e.alive) continue;
        e.x += g.enemyDir * g.enemySpeed;
        if (e.x < 5 || e.x + ENEMY_W > W - 5) hitEdge = true;
      }
      if (hitEdge) {
        g.enemyDir *= -1;
        for (const e of g.enemies) {
          if (e.alive) e.y += 12;
        }
      }

      // Bullet-enemy collision
      for (const bullet of g.bullets) {
        for (const e of g.enemies) {
          if (!e.alive) continue;
          if (bullet.x > e.x && bullet.x < e.x + ENEMY_W && bullet.y > e.y && bullet.y < e.y + ENEMY_H) {
            e.alive = false;
            bullet.y = -100;
            g.score += e.type === 'tough' ? 20 : 10;
            setScore(g.score);
          }
        }
      }

      // Enemy bullet-player collision
      for (const b of g.enemyBullets) {
        if (Math.abs(b.x - g.player.x) < PLAYER_W && Math.abs(b.y - (H - 35)) < PLAYER_H) {
          b.y = H + 100;
          g.lives--;
          setLives(g.lives);
          if (g.lives <= 0) {
            g.running = false;
            setGameOver(true);
            return;
          }
        }
      }

      // Enemy reaches bottom
      for (const e of g.enemies) {
        if (e.alive && e.y + ENEMY_H > H - 50) {
          g.running = false;
          setGameOver(true);
          return;
        }
      }

      // Check win
      if (g.enemies.every(e => !e.alive)) {
        g.running = false;
        setWon(true);
        return;
      }

      // Draw player
      ctx.fillStyle = '#64ffda';
      ctx.beginPath();
      ctx.moveTo(g.player.x, H - 45);
      ctx.lineTo(g.player.x - PLAYER_W, H - 25);
      ctx.lineTo(g.player.x + PLAYER_W, H - 25);
      ctx.closePath();
      ctx.fill();
      // Engine glow
      ctx.fillStyle = '#ff6b35';
      ctx.beginPath();
      ctx.moveTo(g.player.x - 8, H - 25);
      ctx.lineTo(g.player.x, H - 25 + 8 + Math.random() * 4);
      ctx.lineTo(g.player.x + 8, H - 25);
      ctx.closePath();
      ctx.fill();

      // Draw bullets
      ctx.fillStyle = '#64ffda';
      ctx.shadowColor = '#64ffda';
      ctx.shadowBlur = 8;
      g.bullets.forEach(b => {
        ctx.fillRect(b.x - 2, b.y, 4, 10);
      });
      ctx.shadowBlur = 0;

      // Draw enemy bullets
      ctx.fillStyle = '#e74c3c';
      ctx.shadowColor = '#e74c3c';
      ctx.shadowBlur = 5;
      g.enemyBullets.forEach(b => {
        ctx.fillRect(b.x - 2, b.y, 4, 8);
      });
      ctx.shadowBlur = 0;

      // Draw enemies
      for (const e of g.enemies) {
        if (!e.alive) continue;
        ctx.fillStyle = e.type === 'tough' ? '#e74c3c' : '#f39c12';
        // Body
        ctx.fillRect(e.x + 4, e.y + 4, ENEMY_W - 8, ENEMY_H - 4);
        ctx.fillRect(e.x, e.y + 8, ENEMY_W, ENEMY_H - 12);
        // Eyes
        ctx.fillStyle = '#fff';
        ctx.fillRect(e.x + 6, e.y + 8, 4, 4);
        ctx.fillRect(e.x + ENEMY_W - 10, e.y + 8, 4, 4);
        // Legs
        ctx.fillStyle = e.type === 'tough' ? '#c0392b' : '#e67e22';
        ctx.fillRect(e.x + 2, e.y + ENEMY_H - 4, 4, 4);
        ctx.fillRect(e.x + ENEMY_W - 6, e.y + ENEMY_H - 4, 4, 4);
      }

      // HUD
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${g.score}`, 10, 25);
      ctx.textAlign = 'center';
      ctx.fillText(`Wave ${wave}`, W / 2, 25);
      ctx.textAlign = 'right';
      ctx.fillText(`Lives: ${'▲'.repeat(g.lives)}`, W - 10, 25);
    };

    const g = gameRef.current;
    g.animId = requestAnimationFrame(draw);

    const keyDown = (e) => { if (gameRef.current) { gameRef.current.keys[e.key] = true; if (e.key === ' ') e.preventDefault(); } };
    const keyUp = (e) => { if (gameRef.current) gameRef.current.keys[e.key] = false; };
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    return () => {
      if (gameRef.current?.animId) cancelAnimationFrame(gameRef.current.animId);
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
    };
  }, [initGame, wave]);

  const restart = () => { initGame(1); };
  const nextWave = () => { initGame(wave + 1); };

  return (
    <div className="game-container" style={{ textAlign: 'center' }}>
      <canvas ref={canvasRef} width={W} height={H} style={{ borderRadius: '8px', maxWidth: '100%', height: 'auto' }} />
      {(gameOver || won) && (
        <div className="game-overlay">
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
            {won ? `Wave ${wave} Clear! 🚀` : 'Game Over!'}
          </p>
          <p style={{ color: '#64ffda' }}>Score: {score}</p>
          {won ? (
            <button onClick={nextWave} className="game-restart-btn">Next Wave →</button>
          ) : (
            <button onClick={restart} className="game-restart-btn">Try Again</button>
          )}
        </div>
      )}
      <p className="game-controls-hint">← → to move, Space/↑ to shoot</p>
    </div>
  );
}
