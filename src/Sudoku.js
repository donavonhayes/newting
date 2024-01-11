// Sudoku.js
import React, { useState, useEffect } from 'react';
import './index.css';

const Sudoku = () => {
  const SIZE = 9;
  const EMPTY_CELL = 0;

  const generateBoard = () => {
    // how to
    const predefinedBoard = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];

    return predefinedBoard.map((row) => [...row]);
  };

  const [board, setBoard] = useState(generateBoard());
  const [userBoard, setUserBoard] = useState(Array(SIZE).fill(Array(SIZE).fill(null)));
  const [isValid, setIsValid] = useState(true);
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    setBoard(generateBoard());
    setUserBoard(Array(SIZE).fill(Array(SIZE).fill(null)));
  }, []);

  const handleInputChange = (row, col, value) => {
    const newUserBoard = userBoard.map((r) => [...r]);
    newUserBoard[row][col] = value;
    setUserBoard(newUserBoard);
  };

  const handleCellHover = (row, col) => {
    setSelectedCell({ row, col });
  };

  const handleCellLeave = () => {
    setSelectedCell(null);
  };

  const handleKeyDown = (event) => {
    if (!selectedCell) return;

    const key = event.key;
    const isNumeric = /^[1-9]$/.test(key);

    if (isNumeric) {
      handleInputChange(selectedCell.row, selectedCell.col, key);
      event.preventDefault();
    }
  };

  const checkValidity = () => {
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (userBoard[row][col] !== null && userBoard[row][col] !== board[row][col]) {
          setIsValid(false);
          return;
        }
      }
    }
    setIsValid(true);
  };

  const handleNewGame = () => {
    setBoard(generateBoard());
    setUserBoard(Array(SIZE).fill(Array(SIZE).fill(null)));
    setIsValid(true);
    setSelectedCell(null);
  };

  const renderCell = (row, col) => (
    <input
      key={col}
      type="text"
      value={userBoard[row][col] !== null ? userBoard[row][col] : ''}
      onChange={(e) => handleInputChange(row, col, e.target.value)}
      onFocus={() => handleCellHover(row, col)}
      onBlur={handleCellLeave}
      onKeyDown={handleKeyDown}
      className={`sudoku-cell ${board[row][col] !== EMPTY_CELL ? 'predefined' : ''} ${
        selectedCell && selectedCell.row === row && selectedCell.col === col ? 'selected' : ''
      }`}
      readOnly={board[row][col] !== EMPTY_CELL}
    />
  );

  const renderRow = (row) => (
    <div key={row} className="sudoku-row">
      {Array(SIZE)
        .fill(null)
        .map((_, col) => renderCell(row, col))}
    </div>
  );

  return (
    <div className="sudoku-box">
      <div className="sudoku-controls">
        <button onClick={checkValidity}>Check</button>
      </div>
      <div className="sudoku-board">
        {Array(SIZE)
          .fill(null)
          .map((_, row) => renderRow(row))}
      </div>
      <div className="sudoku-controls">
        <button onClick={handleNewGame}>New Game</button>
      </div>
      {!isValid && <div className="error-message">Incorrect solution. Try again!</div>}
    </div>
  );
};

export default Sudoku;
