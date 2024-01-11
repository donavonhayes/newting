// TicTacToe.js
import React, { useState } from 'react';
import './index.css';

const TicTacToe = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winnerLine, setWinnerLine] = useState(null);

  const resetGame = () => {
    setBoard(initialBoard);
    setXIsNext(true);
    setWinnerLine(null);
  };

  const handleClick = (index) => {
    if (calculateWinner(board) || board[index]) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    checkWinner(newBoard);
  };

  const checkWinner = (currentBoard) => {
    const winner = calculateWinner(currentBoard);
    if (winner) {
      const [a, b, c] = winner;
      setWinnerLine([a, b, c]);
    }
  };

  const renderSquare = (index) => {
    const isWinnerSquare = winnerLine && winnerLine.includes(index);
    return (
      <button
        className={`square ${isWinnerSquare ? 'winner' : ''}`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${board[winner[0]]}`
    : board.every((square) => square) // Check for a draw
    ? 'Draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="tic-tac-toe">
      <div className="status">{status}</div>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => (
              <div key={col} className="square-container">
                {renderSquare(row * 3 + col)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

// Function to calculate the winner and winning line
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }

  return null;
};

export default TicTacToe;
