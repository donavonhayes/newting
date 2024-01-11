// Checkers.js
import React, { useState } from 'react';

const Checkers = () => {
  const initialBoard = [
    ['B', null, 'B', null, 'B', null, 'B', null],
    [null, 'B', null, 'B', null, 'B', null, 'B'],
    ['B', null, 'B', null, 'B', null, 'B', null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['R', null, 'R', null, 'R', null, 'R', null],
    [null, 'R', null, 'R', null, 'R', null, 'R'],
    ['R', null, 'R', null, 'R', null, 'R', null],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [turn, setTurn] = useState('B'); // 'B' for black, 'R' for red

  const handleClick = (row, col) => {
    const newBoard = [...board];

    if (selectedPiece === null) {
      const piece = board[row][col];

      if (piece && isPlayerPiece(piece)) {
        setSelectedPiece({ row, col, piece });
      }
    } else {
      const { row: fromRow, col: fromCol, piece } = selectedPiece;

      if (isValidMove(fromRow, fromCol, row, col, piece)) {
        newBoard[row][col] = piece;
        newBoard[fromRow][fromCol] = null;

        setBoard(newBoard);
        setSelectedPiece(null);
        switchTurn();
      }
    }
  };

  const isPlayerPiece = (piece) => {
    return piece === 'B' || piece === 'R';
  };

  const isValidMove = (fromRow, fromCol, toRow, toCol, piece) => {
   
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    if (board[toRow][toCol] !== null) {
      return false;
    }

    return rowDiff === 1 && colDiff === 1;
  };

  const switchTurn = () => {
    setTurn((prevTurn) => (prevTurn === 'B' ? 'R' : 'B'));
  };

  const renderSquare = (row, col, piece) => {
    const isEvenRow = row % 2 === 0;
    const isEvenCol = col % 2 === 0;
    const isBlackSquare = (isEvenRow && isEvenCol) || (!isEvenRow && !isEvenCol);

    return (
      <div
        key={col}
        onClick={() => handleClick(row, col)}
        className={`checkers-square ${isBlackSquare ? 'black' : 'red'} ${
          selectedPiece && selectedPiece.row === row && selectedPiece.col === col
            ? 'selected'
            : ''
        }`}
      >
        {piece && <div className={`checker ${piece.toLowerCase()}`} />}
      </div>
    );
  };

  const renderRow = (row, rowIndex) => (
    <div key={rowIndex} className="checkers-row">
      {row.map((piece, colIndex) => renderSquare(rowIndex, colIndex, piece))}
    </div>
  );

  return (
    <div className="checkers-box">
      <div className="checkers-header">
        <p>Turn: {turn === 'B' ? 'Black' : 'Red'}</p>
      </div>
      <div className="checkers-board">
        {board.map((row, rowIndex) => renderRow(row, rowIndex))}
      </div>
    </div>
  );
};

export default Checkers;
