// Declaring the canvas element in javascript
const gameBoard = document.querySelector('#gameBoard');
// To use the canvas element you need you declare the getContext('2d');
const context = gameBoard.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');
// Determining the size of the game board
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = 'white';
const snakeColor = 'lightgreen';
const snakeBorder = 'black';
const foodColor = 'red';
// 25px is the size of the movement of the snake
const unitSize = 25;
let running = false;
// X and Y axis movement of the snake.
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

/* Snake is consist of array of objects declaring 
the starting position and after eating its food 
it will increment by 1;
Each object is a body part of the snake */

let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];

// Start of the snake game directions/movement
window.addEventListener('keydown', changeDirection);
// For reset button of the game
resetBtn.addEventListener('click', resetGame);

gameStart();

// Start the game function
function gameStart() {
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
}
// Function to determine if the game is running
// Uses a set time out method to know if the snake is still runnning
// Adding interval of 80ms to adjust the speed of the snake
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 80);
  } else {
    displayGameOver();
  }
}

// Function to create the board game
function clearBoard() {
  context.fillStyle = boardBackground;
  context.fillRect(0, 0, gameWidth, gameHeight);
}

// Create a random food position inside the game board
// Generated random number is divisible by the unitsize as the movement of the snake will be base by the unit size
function createFood() {
  function randomFood(min, max) {
    const randomNumber =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randomNumber;
  }
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
}
// Creating food appearance in the gameboard
function drawFood() {
  context.fillStyle = foodColor;
  context.fillRect(foodX, foodY, unitSize, unitSize);
}
// Function for the movement of the snake
function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  // if the food is eaten
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score = score + 1;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}

// Create the appearance of the snake in the gameboard
function drawSnake() {
  context.fillStyle = snakeColor;
  context.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}
// Function in changing the direction of the snake
function changeDirection(event) {
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  const goingUp = yVelocity == -unitSize;
  const goingDown = yVelocity == unitSize;
  const goingRight = xVelocity == unitSize;
  const goingLeft = xVelocity == -unitSize;

  switch (true) {
    case keyPressed == LEFT && !goingRight:
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case keyPressed == UP && !goingDown:
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case keyPressed == RIGHT && !goingLeft:
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case keyPressed == DOWN && !goingUp:
      xVelocity = 0;
      yVelocity = unitSize;
  }
}
// Function to check how will the game ends
// If the snake reach the border or eat his own body
function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}
// To Display game over in the game board
function displayGameOver() {
  context.font = '50px MV Bolic';
  context.fillStyle = 'black';
  context.textAlign = 'center';
  context.fillText('GAME OVER!', gameWidth / 2, gameHeight / 2);
  running = false;
}

// function for the reset button
function resetGame() {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ];
  gameStart();
}
