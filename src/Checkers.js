// Checkers.js

import React, { useState } from 'react';
import './Checkers.css'; // Import your CSS file

const Checkers = () => {
  const initialBoard = [
    ['black', null, 'black', null, null, null, 'red', null],
    [null, 'black', null, 'black', null, 'red', null, 'red'],
    ['black', null, 'black', null, null, null, 'red', null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, 'red', null, 'red', null, 'black', null, 'black'],
    ['red', null, 'red', null, null, null, 'black', null],
    [null, 'red', null, 'red', null, 'black', null, 'black'],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [playerTurn, setPlayerTurn] = useState('red'); // 'red' or 'black'
  const [winner, setWinner] = useState(null);

  const handleSquareClick = (row, col) => {
    if (winner) {
      alert(`Game over! ${winner} wins!`);
      return;
    }

    if (selectedPiece) {
      const isLegalMove = isMoveLegal(selectedPiece.row, selectedPiece.col, row, col);
      if (isLegalMove) {
        const newBoard = performMove(selectedPiece.row, selectedPiece.col, row, col);
        setBoard(newBoard);
        handleTurnEnd(newBoard, row, col);
      } else {
        alert('Illegal move. Try again.');
      }
    } else {
      handlePieceSelection(row, col);
    }
  };

  const isMoveLegal = (startRow, startCol, endRow, endCol) => {
    // Implement the logic to check if the move is legal
    // This depends on the specific rules of checkers
    // You may need to consider capturing, kings, and valid directions
    // This is a placeholder and needs to be customized
    return true;
  };

  const performMove = (startRow, startCol, endRow, endCol) => {
    const newBoard = [...board];
    const selectedPieceColor = newBoard[startRow][startCol];

    newBoard[startRow][startCol] = null;
    newBoard[endRow][endCol] = selectedPieceColor;

    // Additional logic for capturing goes here (not implemented in this example)

    return newBoard;
  };

  const handleTurnEnd = (newBoard, endRow, endCol) => {
    // Implement logic to handle king promotion and other turn-ending scenarios
    // This is a placeholder and needs to be customized

    // Check for a winner after each turn
    const winner = checkForWinner(newBoard);
    if (winner) {
      setWinner(winner);
      alert(`Game over! ${winner} wins!`);
      return;
    }

    setPlayerTurn(playerTurn === 'red' ? 'black' : 'red');
    setSelectedPiece(null);
  };

  const handlePieceSelection = (row, col) => {
    const piece = board[row][col];
    if (piece !== null && piece === playerTurn) {
      setSelectedPiece({ row, col });
    }
  };

  const checkForWinner = (currentBoard) => {
    // Inside Checkers.js

const checkForWinner = (currentBoard) => {
  let redPieces = 0;
  let blackPieces = 0;

  // Count the remaining pieces of each color
  currentBoard.forEach(row => {
    row.forEach(piece => {
      if (piece === 'red') {
        redPieces++;
      } else if (piece === 'black') {
        blackPieces++;
      }
    });
  });

  // Check if one player has no remaining pieces
  if (redPieces === 0) {
    return 'black'; // Black wins
  } else if (blackPieces === 0) {
    return 'red'; // Red wins
  }

  // Check if a player is unable to make a legal move
  const playerCannotMove = (color) => {
    for (let row = 0; row < currentBoard.length; row++) {
      for (let col = 0; col < currentBoard[row].length; col++) {
        if (currentBoard[row][col] === color) {
          // Check if the piece can make any legal moves
          if (canPieceMove(currentBoard, row, col)) {
            return false; // The player can make a move
          }
        }
      }
    }
    return true; // The player cannot make any move
  };

  // Check if either player cannot make a move
  if (playerCannotMove('red')) {
    return 'black'; // Black wins
  } else if (playerCannotMove('black')) {
    return 'red'; // Red wins
  }

  // If no winner yet
  return null;
};

const canPieceMove = (currentBoard, row, col) => {
  // Implement logic to check if the piece at (row, col) can make any legal moves
  // This depends on the specific rules of checkers
  // You may need to consider regular moves, capturing, and kings
  // This is a placeholder and needs to be customized
  return true;
};

    return null;
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
