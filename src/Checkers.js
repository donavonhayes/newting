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

// Inside App component

const [squares, setSquares] = useState([]);
const [turn, setTurn] = useState('black'); // or 'red'
const [selectedPiece, setSelectedPiece] = useState(null);
const [gameOver, setGameOver] = useState(false);

// Initialize the board and pieces

const initializeBoard = () => {
  // Initialize the board as before
};

// Function to handle clicking on squares

const handleClick = (index) => {
  if (gameOver) return;

  const { row, col } = calculateRowCol(index);

  if (!selectedPiece) {
    // Select a piece if it's the current player's turn
    if (squares[row][col].piece && squares[row][col].piece.color === turn) {
      setSelectedPiece({ row, col });
    }
  } else {
    // Handle moving the selected piece
    const isValidMove = checkValidMove(selectedPiece, { row, col });
    if (isValidMove) {
      const updatedSquares = movePiece(selectedPiece, { row, col });

      // Check for captures and additional moves
      const captures = checkCaptures({ row, col }, updatedSquares);
      if (captures.length > 0) {
        // Continue capturing
        // Update the board
      } else {
        // Switch turns
        setTurn(turn === 'black' ? 'red' : 'black');
        setSelectedPiece(null);
      }
    } else {
      // Invalid move, deselect the piece
      setSelectedPiece(null);
    }
  }
};

return (
  <div className="App">
    <h1>Checkers Game</h1>
    <Board squares={squares} onClick={handleClick} />
    {gameOver && <h2>Game Over</h2>}
  </div>
);


export default App;
