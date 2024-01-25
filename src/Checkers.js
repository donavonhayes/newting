import React, { useState, useEffect } from 'react';
import './index.css';

const BOARD_SIZE = 8;

function Square({ black, children, onClick }) {
  const backgroundColor = black ? 'black' : 'white';
  const color = black ? 'white' : 'black';

  return (
    <div
      style={{
        backgroundColor,
        color,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function Board({ squares, onClick }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${BOARD_SIZE}, 50px)`,
        gridTemplateRows: `repeat(${BOARD_SIZE}, 50px)`,
        width: BOARD_SIZE * 50,
      }}
    >
      {squares.flat().map((square, index) => (
        <Square key={index} black={square.black} onClick={() => onClick(index)}>
          {square.piece}
        </Square>
      ))}
    </div>
  );
}

function App() {
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const newSquares = Array(BOARD_SIZE)
      .fill(null)
      .map((_, row) =>
        Array(BOARD_SIZE)
          .fill(null)
          .map((_, col) => ({
            black: (row + col) % 2 === 1,
            piece: null,
          }))
      );

    // Set initial positions of black and red pieces

    setSquares(newSquares);
  };

  const handleClick = (index) => {
    // Handle clicking logic for moving pieces
  };

  return (
    <div className="App">
      <h1>Checkers Game</h1>
      <Board squares={squares} onClick={handleClick} />
    </div>
  );
}


export default App;
