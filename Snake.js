// Game constants and varibales
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio("Ding-sound-effect-[AudioTrimmer.com].mp3");
const gameoversound = new Audio("glass-shattering-sound-effect.mp3");
const musicsound = new Audio("let-the-games-begin-21858.mp3");
let speed = 10;
let score = 0;
let LastPaintTime = 0;
let snakeArr = [{ x: 3, y: 3 }];
food = { x: 3, y: 6 };

// Game functions
function main(ctime) {
  window.requestAnimationFrame(main);
  //   console.log(ctime);
  if ((ctime - LastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  LastPaintTime = ctime;
  gameEngine();
}
function isCollide(snake) {
  // If Snake Collids Itself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // If Snake Collids Wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}
function gameEngine() {
  // part1: Updating the Snake array and Food
  if (isCollide(snakeArr)) {
    gameoversound.play();
    musicsound.pause();
    inputDir = { x: 0, y: 0 };
    alert(
      "Game Over." +
        " Your score was: " +
        score +
        "                                                             Press any key to Play Again!"
    );
    snakeArr = [{ x: 3, y: 3 }];
    musicsound.play();
    score = 0;
    scoreBox.innerHTML = "Score: " + score;
  }
  //   If Snake have eaten the Food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodsound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "High Score: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    console.log(score);
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the Snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // part2: Display the Snake and Food
  //  Display the Snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // Display the Food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Game logic
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  musicsound.play();
  inputDir = { x: 0, y: 1 }; // Start the Game
  switch (e.key) {
    case "ArrowUp":
      //   console.log("UP");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      //   console.log("Down");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      //   console.log("Left");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      //   console.log("Right");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
