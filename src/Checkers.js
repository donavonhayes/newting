import React, { useState } from 'react';

function Checkers() {
  const initialBoard = [
    ['', 'black', '', 'black', '', 'black', '', 'black'],
    ['black', '', 'black', '', 'black', '', 'black', ''],
    ['', 'black', '', 'black', '', 'black', '', 'black'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['red', '', 'red', '', 'red', '', 'red', ''],
    ['', 'red', '', 'red', '', 'red', '', 'red'],
    ['red', '', 'red', '', 'red', '', 'red', '']
  ];

  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const handleSquareClick = (row, col) => {
    if (selectedPiece) {
      // Move the selected piece to the clicked square
      const updatedBoard = [...board];
      updatedBoard[row][col] = selectedPiece;
      updatedBoard[selectedPiece.row][selectedPiece.col] = '';
      setBoard(updatedBoard);
      setSelectedPiece(null);
    } else {
      // Select the piece if it belongs to the current player
      const piece = board[row][col];
      if (piece === 'red' /* or another condition to determine current player */) {
        setSelectedPiece({ piece, row, col });
      }
    }
  };

  return (
    <div className="checkers">
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((square, colIndex) => (
              <div
                key={colIndex}
                className={`square ${((rowIndex + colIndex) % 2 === 0) ? 'black' : 'red'}`}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {square && <div className={`piece ${square}`} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Checkers;

 Styles

Checkers 
  display: flex;
  justify: center;
  align: center;


board 
  display: grid;
  grid-template columns:'repeat(8, 50px)';
  grid-template rows: 'repeat(8, 50px)';

row 
  display: 'flex';


square 
  width: '5px';
  height: '50px';
  display: 'flex';
  justifycontent: 'center';
  alignitems: 'center';
  cursor: pointer;


black 
  backgroundcolor: '#8b4513'; /* Dark brown */


red 
  backgroundcolor: '#f0d9b5'; /* Light brown */


piece 
  width: '80%';
  height: '80%';
  borderradius: '50%';



black-piece 
  backgroundcolor: 'black';


red-piece 
  backgroundcolor: 'red';

