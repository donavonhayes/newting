let board = [
  [0, -1, 0, -1, 0, -1, 0, -1, 0, -1],
  [-1, 0, -1, 0, -1, 0, -1, 0, -1, 0],
  [0, -1, 0, -1, 0, -1, 0, -1, 0, -1],
  [-1, 0, -1, 0, -1, 0, -1, 0, -1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
];

function builBoard() {
  game.innerHTML = "";
  
  for (let i = 0; i < board.length; i++) {
    const element = board[i];
    let row = document.createElement("div"); // create div for each row
    row.setAttribute("class", "row");

    for (let j = 0; j < element.length; j++) {
      const elmt = element[j];
      let col = document.createElement("div"); 
      let piece = document.createElement("div");
      let caseType = "";
      let occupied = "";

      if (i % 2 === 0) {
        if (j % 2 === 0) {
          caseType = "Whitecase";
        } else {
          caseType = "blackCase";
        }
      } else {
        if (j % 2 !== 0) {
          caseType = "Whitecase";
        } else {
          caseType = "blackCase";
        }
      }

      // add the piece if the case isn't empty
      if (board[i][j] === 1) {
        occupied = "whitePiece";
      } else if (board[i][j] === -1) {
        occupied = "blackPiece";
      } else {
        occupied = "empty";
      }

      piece.setAttribute("class", "occupied " + occupied);

      // set row and colum in the case
      piece.setAttribute("row", i);
      piece.setAttribute("column", j);
      piece.setAttribute("data-position", i + "-" + j);

      //add event listener to each piece
      piece.addEventListener("click", movePiece);

      col.appendChild(piece);

      col.setAttribute("class", "column " + caseType);
      row.appendChild(col);
      
    }

    game.appendChild(row);
  }
}

let currentPlayer = 1;

let newPiecesPositions = [];

function movePiece(e) {
  let piece = e.target;
  const row = parseInt(piece.getAttribute("row"));
  const column = parseInt(piece.getAttribute("column"));
  let p = new Piece(row, column);

  
  if (newPiecesPosition.length > 0) {
    enableToMove(p);
  }

  if (currentPlayer === board[row][column]) {
    findPossibleNewPosition(p, player);
  }
}

function findPossibleNewPosition(piece, player) {
  if (board[piece.row + player][piece.column + 1] === 0) {
    readyToMove = piece;
    markPossiblePosition(piece, player, 1);
  }

  if (board[piece.row + player][piece.column - 1] === 0) {
    readyToMove = piece;
    markPossiblePosition(piece, player, -1);
  }
}

function enableToMove(p) {
  let find = false;
  let newPosition = null;
  // check if the case where the player play the selected piece can move on
  posNewPosition.forEach((element) => {
    if (element.compare(p)) {
      find = true;
      newPosition = element;
      return;
    }
  });

  if (find) moveThePiece(newPosition);
  else builBoard();
}

function moveThePiece(newPosition) {
  // if the current piece can move on, edit the board and rebuild
  board[newPosition.row][newPosition.column] = currentPlayer;
  board[readyToMove.row][readyToMove.column] = 0;

  // init value
  readyToMove = null;
  posNewPosition = [];
  capturedPosition = [];

  currentPlayer = reverse(currentPlayer);

  displayCurrentPlayer();
  builBoard();
}

function findPieceCaptured(p, player) {
  let found = false;
  if (
    board[p.row - 1][p.column - 1] === player &&
    board[p.row - 2][p.column - 2] === 0
  ) {
    found = true;
    newPosition = new Piece(p.row - 2, p.column - 2);
    readyToMove = p;
    markPossiblePosition(newPosition);
    // save the new position and the opponent's piece position
    capturedPosition.push({
      newPosition: newPosition,
      pieceCaptured: new Piece(p.row - 1, p.column - 1),
    });
  }

  if (
    board[p.row - 1][p.column + 1] === player &&
    board[p.row - 2][p.column + 2] === 0
  ) {
    found = true;
    newPosition = new Piece(p.row - 2, p.column + 2);
    readyToMove = p;
    markPossiblePosition(newPosition);
    // save the new position and the opponent's piece position
    capturedPosition.push({
      newPosition: newPosition,
      pieceCaptured: new Piece(p.row - 1, p.column + 1),
    });
  }

  i

 
  return found;
}



function enableToCapture(p) {
  let find = false;
  let pos = null;
  capturedPosition.forEach((element) => {
    if (element.newPosition.compare(p)) {
      find = true;
      pos = element.newPosition;
      old = element.pieceCaptured;
      return;
    }
  });

  if (find) {
    // if the current piece can move on, edit the board and rebuild
    board[pos.row][pos.column] = currentPlayer; // move the piece
    board[readyToMove.row][readyToMove.column] = 0; // delete the old position
    // delete the piece that had been captured
    board[old.row][old.column] = 0;

    // reinit ready to move value

    readyToMove = null;
    capturedPosition = [];
    posNewPosition = [];
    displayCurrentPlayer();
    builBoard();
    // check if there are possibility to capture other piece
    currentPlayer = reverse(currentPlayer);
  } else {
    builBoard();
  }
}


if (board[i][j] === -1) {
  blackPiecesCounter++;
} else if (board[i][j] === 1) {
  whitePiecesCounter++;
}

function displayCounter(blackPiecesCounter, whitePiecesCounter) {
  var blackContainer = document.getElementById("black-player-count-pieces");
  var whiteContainer = document.getElementById("white-player-count-pieces");
  blackContainer.innerHTML = blackPiecesCounter;
  whiteContainer.innerHTML = whitePiecesCounter;
}

function displayCurrentPlayer() {
  let container = document.getElementById("next-player");
  if (container.classList.contains("whitePiece")) {
    container.setAttribute("class", "occupied blackPiece");
  } else {
    container.setAttribute("class", "occupied whitePiece");
  }
}
if (black === 0 || white === 0) {
  modalOpen(black);
}


function modalOpen(black) {
document.getElementById("winner").innerHTML = black === 0 ? "White" : "Black";
document.getElementById("loser").innerHTML = black !== 0 ? "White" : "Black";
modal.classList.add("effect");
}

export default Checkers;


