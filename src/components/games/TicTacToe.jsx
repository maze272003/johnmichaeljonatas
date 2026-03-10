import React, { useState } from 'react';

const winLines = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWinner(board) {
  for (const [a, b, c] of winLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return board.includes(null) ? null : { winner: 'draw', line: [] };
}

function minimax(board, isMax) {
  const result = checkWinner(board);
  if (result) {
    if (result.winner === 'O') return 10;
    if (result.winner === 'X') return -10;
    return 0;
  }

  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'O';
        best = Math.max(best, minimax(board, false));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'X';
        best = Math.min(best, minimax(board, true));
        board[i] = null;
      }
    }
    return best;
  }
}

function aiMove(board) {
  let bestScore = -Infinity;
  let bestMove = 0;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'O';
      const score = minimax(board, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [result, setResult] = useState(null);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  const handleClick = (i) => {
    if (board[i] || result) return;
    const newBoard = [...board];
    newBoard[i] = 'X';

    const check1 = checkWinner(newBoard);
    if (check1) {
      setBoard(newBoard);
      setResult(check1);
      if (check1.winner === 'X') setXScore(s => s + 1);
      return;
    }

    // AI turn
    const ai = aiMove([...newBoard]);
    newBoard[ai] = 'O';
    const check2 = checkWinner(newBoard);
    setBoard(newBoard);
    if (check2) {
      setResult(check2);
      if (check2.winner === 'O') setOScore(s => s + 1);
    }
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setResult(null);
  };

  return (
    <div className="game-container" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem', fontFamily: 'Fira Code, monospace', fontSize: '0.9rem' }}>
        <span style={{ color: '#64ffda' }}>You (X): {xScore}</span>
        <span style={{ color: '#e74c3c' }}>AI (O): {oScore}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gap: '6px', justifyContent: 'center' }}>
        {board.map((cell, i) => {
          const isWinCell = result?.line?.includes(i);
          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              style={{
                width: '80px',
                height: '80px',
                fontSize: '2rem',
                fontWeight: 'bold',
                background: isWinCell ? 'rgba(100,255,218,0.15)' : 'var(--secondary-color, #112240)',
                border: `2px solid ${isWinCell ? '#64ffda' : 'rgba(100,255,218,0.15)'}`,
                borderRadius: '8px',
                color: cell === 'X' ? '#64ffda' : '#e74c3c',
                cursor: cell || result ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {cell}
            </button>
          );
        })}
      </div>

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {result.winner === 'draw' ? "It's a Draw!" : result.winner === 'X' ? 'You Win! 🎉' : 'AI Wins! 🤖'}
          </p>
          <button onClick={reset} className="game-restart-btn">Play Again</button>
        </div>
      )}

      {!result && (
        <p className="game-controls-hint">Click a cell to place X</p>
      )}
    </div>
  );
}
