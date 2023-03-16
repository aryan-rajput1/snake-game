const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");


// Snake initial position and size
const snake = [  { x: 150, y: 150 },  { x: 140, y: 150 },  { x: 130, y: 150 },  { x: 120, y: 150 },  { x: 110, y: 150 },];

// Initial direction for the snake
let dx = 10;
let dy = 0;

// Food initial position
let foodX;
let foodY;

// Draw the snake on the canvas
function drawSnake() {
  snake.forEach((part) => {
    ctx.fillStyle = "lightgreen";
    ctx.strokestyle = "darkgreen";
    ctx.fillRect(part.x, part.y, 10, 10);
    ctx.strokeRect(part.x, part.y, 10, 10);
  });
}

// Generate a random position for the food on the canvas
function randomFood() {
  foodX = Math.floor(Math.random() * canvas.width / 10) * 10;
  foodY = Math.floor(Math.random() * canvas.height / 10) * 10;
}

// Draw the food on the canvas
function drawFood() {
  ctx.fillStyle = "red";
  ctx.strokestyle = "darkred";
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}

// Move the snake in the direction specified
function advanceSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
  if (didEatFood) {
    randomFood();
  } else {
    snake.pop();
  }
}
// Check if the snake collides with itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      clearInterval(gameInterval);
      alert("Game Over");
    }
  }
// Keyboard controls to change the direction of the snake
document.onkeydown = function(event) {
  switch (event.keyCode) {
    case 37:
      dx = -10;
      dy = 0;
      break;
    case 38:
      dx = 0;
      dy = -10;
      break;
    case 39:
      dx = 10;
      dy = 0;
      break;
    case 40:
      dx = 0;
      dy = 10;
      break;
  }
};


// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Main game loop
function main() {
  setTimeout(() => {
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();

    main();
  }, 100);
}


randomFood();
main();
