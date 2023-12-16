<<<<<<< Updated upstream
=======

const playerOne = 'X';
const playerTwo = 'O';
const lineColor = "#445069";
>>>>>>> Stashed changes

var player = 1;
var lineColor = "#445069";

var canvas = document.getElementById('tic-tac-toe-board');
var context = canvas.getContext('2d');

var canvasSize = 500;
var sectionSize = canvasSize / 3;
canvas.width = canvasSize;
canvas.height = canvasSize;
context.translate(0.5, 0.5);

function getInitialBoard(defaultValue) {
  var board = [];

  for (var x = 0; x < 3; x++) {
    board.push([]);

    for (var y = 0; y < 3; y++) {
      board[x].push(defaultValue);
    }
  }

  return board;
}

var board = getInitialBoard("");

function addPlayingPiece(mouse) {
  var xCordinate;
  var yCordinate;

  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      xCordinate = x * sectionSize;
      yCordinate = y * sectionSize;

      if (
        mouse.x >= xCordinate && mouse.x <= xCordinate + sectionSize &&
        mouse.y >= yCordinate && mouse.y <= yCordinate + sectionSize
      ) {

        clearPlayingArea(xCordinate, yCordinate);

        if (player === 1) {
          drawX(xCordinate, yCordinate);
        } else {
          drawO(xCordinate, yCordinate);
        }
      }
    }
  }
}

function clearPlayingArea(xCordinate, yCordinate) {
  context.fillStyle = "#fff";
  context.fillRect(
    xCordinate,
    yCordinate,
    sectionSize,
    sectionSize
  );
}
function drawO(xCordinate, yCordinate) {
  var halfSectionSize = (0.5 * sectionSize);
  var centerX = xCordinate + halfSectionSize;
  var centerY = yCordinate + halfSectionSize;
  var radius = (sectionSize - 100) / 2;
  var startAngle = 0 * Math.PI;
  var endAngle = 2 * Math.PI;

  context.lineWidth = 10;
  context.strokeStyle = "#A8DF8E";
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.stroke();
}

function drawX(xCordinate, yCordinate) {
  context.strokeStyle = "#FFC7EA";

  context.beginPath();

  var offset = 50;
  context.moveTo(xCordinate + offset, yCordinate + offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);

  context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

  context.stroke();
}

function drawLines(lineWidth, strokeStyle) {
  var lineStart = 4;
  var lineLenght = canvasSize - 5;
  context.lineWidth = lineWidth;
  context.lineCap = 'round';
  context.strokeStyle = strokeStyle;
  context.beginPath();

  /*
   * Horizontal lines 
   */
  for (var y = 1; y <= 2; y++) {
    context.moveTo(lineStart, y * sectionSize);
    context.lineTo(lineLenght, y * sectionSize);
  }

  /*
   * Vertical lines 
   */
  for (var x = 1; x <= 2; x++) {
    context.moveTo(x * sectionSize, lineStart);
    context.lineTo(x * sectionSize, lineLenght);
  }

  context.stroke();
}

drawLines(10, lineColor);

function getCanvasMousePosition(event) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
<<<<<<< Updated upstream
  }
=======
  };
}

function checkForWinner() {
  // Check for diagonal win
  if (
    (board[0][0] !== "" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
    (board[0][2] !== "" && board[0][2] === board[1][1] && board[1][1] === board[2][0])
  ) {
    return board[1][1];
  }

  // Check for row and column win
  for (let i = 0; i < 3; i++) {
    // Check rows
    if (
      (board[i][0] !== "" && board[i][0] === board[i][1] && board[i][1] === board[i][2])
    ) {
      return board[i][0];
    }

    // Check columns
    if (
      (board[0][i] !== "" && board[0][i] === board[1][i] && board[1][i] === board[2][i])
    ) {
      return board[0][i];
    }
  }

  return null;
}

function getWinningLine() {
  if (
    (board[0][0] !== "" && board[0][0] === board[1][1] && board[1][1] === board[2][2])
  ) {
    return { type: "diagonal", index: 0 };
  } else if (
    (board[0][2] !== "" && board[0][2] === board[1][1] && board[1][1] === board[2][0])
  ) {
    return { type: "diagonal", index: 1 };
  }
  for (let i = 0; i < 3; i++) {
    if (
      (board[i][0] !== "" && board[i][0] === board[i][1] && board[i][1] === board[i][2])
    ) {
      return { type: "row", index: i };
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      (board[0][i] !== "" && board[0][i] === board[1][i] && board[1][i] === board[2][i])
    ) {
      return { type: "column", index: i };
    }
  }

  return null;
}

function drawWinningLine() {
  if (winningLine) {
    context.strokeStyle = "#FF0000";
    context.lineWidth = 8;

    if (winningLine.type === "column") {
      const y = (winningLine.index + 0.5) * sectionSize;
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvasSize, y);
      context.stroke();
    } else if (winningLine.type === "row") {
      const x = (winningLine.index + 0.5) * sectionSize;
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvasSize);
      context.stroke();
    } else if (winningLine.type === "diagonal") {
      if (winningLine.index === 0) {
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(canvasSize, canvasSize);
        context.stroke();
      } else if (winningLine.index === 1) {
        context.beginPath();
        context.moveTo(0, canvasSize);
        context.lineTo(canvasSize, 0);
        context.stroke();
      }
    }
  } else {
    console.error("No winning line detected!");
  }
}

function isBoardFull() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "") {
        return false;
      }
    }
  }
  return true;
}

function resetGame() {
  context.clearRect(0, 0, canvasSize, canvasSize);
  currentPlayer = playerOne;
  winningLine = null;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j] = "";
    }
  }
  drawLines(10, lineColor);
>>>>>>> Stashed changes
}

canvas.addEventListener('mouseup', function (event) {
  if (player === 1) {
    player = 2;
  } else {
    player = 1;
  }

  var canvasMousePosition = getCanvasMousePosition(event);
  addPlayingPiece(canvasMousePosition);
  drawLines(10, lineColor);
});