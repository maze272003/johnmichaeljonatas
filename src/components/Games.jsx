import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Gamepad2, Loader2, Bird, Circle, Car, X, Brain, Table, Blocks, Hammer, Rocket, Palette, Worm } from 'lucide-react';
import GameModal from './GameModal';

// Lazy load games for performance
const FlappyBird = lazy(() => import('./games/FlappyBird'));
const BounceBall = lazy(() => import('./games/BounceBall'));
const CarRacing3D = lazy(() => import('./games/CarRacing3D'));
const SnakeGame = lazy(() => import('./games/SnakeGame'));
const TicTacToe = lazy(() => import('./games/TicTacToe'));
const MemoryMatch = lazy(() => import('./games/MemoryMatch'));
const Pong = lazy(() => import('./games/Pong'));
const BrickBreaker = lazy(() => import('./games/BrickBreaker'));
const WhackAMole = lazy(() => import('./games/WhackAMole'));
const SpaceShooter = lazy(() => import('./games/SpaceShooter'));
const ColorMatch = lazy(() => import('./games/ColorMatch'));

const gamesData = [
  {
    id: 'flappy-bird',
    title: 'Flappy Bird',
    description: 'Tap to fly through pipes!',
    icon: Bird,
    color: '#f1c40f',
    component: FlappyBird,
    tag: '2D Canvas',
  },
  {
    id: 'bounce-ball',
    title: 'Bounce Ball',
    description: 'Keep bouncing on platforms!',
    icon: Circle,
    color: '#e74c3c',
    component: BounceBall,
    tag: '2D Canvas',
  },
  {
    id: 'car-racing',
    title: 'Car Racing 3D',
    description: '3D racing with GPU rendering!',
    icon: Car,
    color: '#3498db',
    component: CarRacing3D,
    tag: '3D WebGL GPU',
  },
  {
    id: 'snake',
    title: 'Snake Game',
    description: 'Classic snake, eat and grow!',
    icon: Worm,
    color: '#2ecc71',
    component: SnakeGame,
    tag: '2D Canvas',
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    description: 'Beat the unbeatable AI!',
    icon: X,
    color: '#9b59b6',
    component: TicTacToe,
    tag: 'AI Logic',
  },
  {
    id: 'memory-match',
    title: 'Memory Match',
    description: 'Find all matching pairs!',
    icon: Brain,
    color: '#e67e22',
    component: MemoryMatch,
    tag: 'Puzzle',
  },
  {
    id: 'pong',
    title: 'Pong',
    description: 'Classic paddle vs AI!',
    icon: Table,
    color: '#1abc9c',
    component: Pong,
    tag: '2D Canvas',
  },
  {
    id: 'brick-breaker',
    title: 'Brick Breaker',
    description: 'Smash all the bricks!',
    icon: Blocks,
    color: '#e74c3c',
    component: BrickBreaker,
    tag: '2D Canvas',
  },
  {
    id: 'whack-a-mole',
    title: 'Whack-a-Mole',
    description: 'Whack moles before they hide!',
    icon: Hammer,
    color: '#8e44ad',
    component: WhackAMole,
    tag: 'Reaction',
  },
  {
    id: 'space-shooter',
    title: 'Space Shooter',
    description: 'Defend against alien waves!',
    icon: Rocket,
    color: '#2c3e50',
    component: SpaceShooter,
    tag: '2D Canvas',
  },
  {
    id: 'color-match',
    title: 'Color Match',
    description: 'Match colors, not words!',
    icon: Palette,
    color: '#16a085',
    component: ColorMatch,
    tag: 'Brain Teaser',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

function GameLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', color: '#64ffda' }}>
      <Loader2 className="animate-spin" size={32} />
      <span style={{ marginLeft: '0.75rem', fontFamily: 'Fira Code, monospace' }}>Loading game...</span>
    </div>
  );
}

export default function Games() {
  const [activeGame, setActiveGame] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const openGame = (game) => setActiveGame(game);
  const closeGame = () => setActiveGame(null);

  return (
    <>
      <section id="games" className="games-section" ref={ref}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="number">06.</span>
          Mini Games
          <Gamepad2 size={28} style={{ marginLeft: '0.75rem', color: 'var(--accent-color)' }} />
        </motion.h2>

        <motion.p
          className="games-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Take a break and enjoy these interactive games — built with Canvas 2D, Three.js WebGL (GPU), and React.
        </motion.p>

        <motion.div
          className="games-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {gamesData.map((game) => (
            <motion.div
              key={game.id}
              variants={cardVariants}
              className="game-card"
              onClick={() => openGame(game)}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="game-card-emoji" style={{ background: `${game.color}20` }}>
                <game.icon size={28} color={game.color} />
              </div>
              <div className="game-card-info">
                <h3 className="game-card-title">{game.title}</h3>
                <p className="game-card-desc">{game.description}</p>
                <span className="game-card-tag" style={{ borderColor: game.color, color: game.color }}>
                  {game.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <GameModal
        isOpen={!!activeGame}
        onClose={closeGame}
        title={activeGame?.title || ''}
      >
        {activeGame && (
          <Suspense fallback={<GameLoader />}>
            <activeGame.component />
          </Suspense>
        )}
      </GameModal>
    </>
  );
}
