
let border = new Image();
border.src = './assets/border.jpg';

let character = new Image();
character.src = './assets/marineShooter.png';
// character.onload = function () {
//   gameLoop();
// };

let zombie = new Image();
zombie.src = './assets/zombieB.png';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const width = 57;
const height = 80;
const scale = 1;

let MOVEMENT_SPEED = 2;
let positionX = 0;
let positionY = 0;

let zombieX = 1400;
let zombieY = 300;
let zombieSpeed = .5;

let score = 0;
let lives = 9;


const FRAME_LIMIT = 12;

function gameLoop() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(border, 0, 0, 5, 600, 220, 0, 5, 600)

  let hasMoved = false;

  if (keyPresses.w) {
    moveCharacter(0, -MOVEMENT_SPEED);
    hasMoved = true;
  } else if (keyPresses.s) {
    moveCharacter(0, MOVEMENT_SPEED);
    hasMoved = true;
  }

  if (keyPresses.a) {
    moveCharacter(-MOVEMENT_SPEED, 0);
    hasMoved = true;
  } else if (keyPresses.d) {
    moveCharacter(MOVEMENT_SPEED, 0);
    hasMoved = true;
  }

  if (hasMoved) {
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
      }
    }
  }

  if (zombieX > 220) {
    zombieX = zombieX - zombieSpeed
  }
  else {
    zombieX = 1400
    zombieY = Math.random() * 500;
    lives = lives - 1;
  }
  drawFrame(0, 0, positionX, positionY);
  window.requestAnimationFrame(gameLoop);

  ctx.drawImage(zombie, zombieX, zombieY, 40, 80)

  if (keyPresses.space) {
    if (positionY >= zombieY && positionY <= zombieY + 50) {
      console.log('SHOOT');
      zombieX = 1400
      zombieY = Math.random() * 500;
      zombieSpeed = zombieSpeed + 1
      score = score + 20
      MOVEMENT_SPEED = MOVEMENT_SPEED + .5
    }
  }
  
  document.getElementById("score").value = score
  document.getElementById("lives").value = lives
}


function drawFrame(frameX, frameY, canvasX, canvasY) {
  console.log(width, height)
  ctx.drawImage(character, canvasX, canvasY, width, height)
}

const cycleLoop = [0, 1, 2];
let currentLoopIndex = 0;
let frameCount = 0;

function moveCharacter(deltaX, deltaY) {
  if (positionX + deltaX > 0 && positionX + deltaX < 150) {
    positionX += deltaX;
  }
  if (positionY + deltaY > 0 && positionY + deltaY < canvas.height) {
    positionY += deltaY;
  }
}


function gameContainer() {
  canvas.width = 1450;
  canvas.height = 600;
}

gameContainer()

let keyPresses = {};

window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
  if (event.key == ' ') {
    keyPresses['space'] = true;
  } else {
    keyPresses[event.key] = true;
  }
}

window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
  if (event.key == ' ') {
    keyPresses['space'] = false;
  } else {
    keyPresses[event.key] = false;
  }
}