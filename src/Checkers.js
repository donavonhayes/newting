// Checkers.js

import React, { useState } from 'react';
import './index.css'; // Import your CSS file

const Checkers = () => {
  const [board, setBoard] = useState([
    ['black', null, 'black', null, null, null, 'red', null],
    [null, 'black', null, 'black', null, 'red', null, 'red'],
    ['black', null, 'black', null, null, null, 'red', null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, 'red', null, 'red', null, 'black', null, 'black'],
    ['red', null, 'red', null, null, null, 'black', null],
    [null, 'red', null, 'red', null, 'black', null, 'black'],
  ]);

  const [selectedPiece, setSelectedPiece] = useState(null);

  const handleSquareClick = (row, col) => {
    if (selectedPiece) {
      // Handle the move logic here
      // For simplicity, let's assume legal moves are only diagonal and capturing
      // You may need to implement the full rules of checkers

      const isLegalMove = ''
      if (isLegalMove) {
        // Update the board state
        const newBoard = /* Perform the move and update the board */
        setBoard(newBoard);
        setSelectedPiece(null);
      } else {
        // Inform the player that the move is not legal
        alert('Illegal move. Try again.');
      }
    } else {
      // Handle the selection logic here
      const piece = board[row][col];
      if (piece !== null /* Check if it's the player's piece */) {
        setSelectedPiece({ row, col });
      }
    }
  };

  return (
    <div className="checkers-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="checkers-row">
          {row.map((piece, colIndex) => (
            <div
              key={colIndex}
              className={`checker ${piece}`}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Checkers;
