// window.addEventListener('load', function(){
//     const canvas = document.getElementById('game-container');
//     const ctx = canvas.getContext('2d');
//     canvas.width = 1050;
//     canvas.height = 600;
// });

// let posX = 50
// let posY = 50
// let width = 10500
// let height = 10500

// let character = playableCharacter('../assets/Idle.png');
let border = new Image();
border.src = '../assets/border.jpg';

let character = new Image();
character.src = '../assets/marineShooter.png';
character.onload = function () {
  gameLoop();
};

let zombie = new Image();
zombie.src = '../assets/zombieB.png';
zombie.onload = function () {
  gameLoop();
};

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const width = 57;
const height = 80;
const scale = 1;

const MOVEMENT_SPEED = 3;
let positionX = 0;
let positionY = 0;

let zombieX = 1400
let zombieY = 300

// let characterY = 

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

  if (keyPresses.space && height == zombieY <= 100) {
    console.log('SHOOT');
    // Check character Y position and compare to zombie Y position and event click 
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

  if (zombieX > 220){
    zombieX = zombieX - 3 
  }
  else{
    zombieX = 1400
    zombieY = Math.random() * 500;
  }



  drawFrame(//cycleLoop[currentLoopIndex],
0, 0, positionX, positionY);
  window.requestAnimationFrame(gameLoop);

  // ctx.drawImage(character, 0, 0, 57, 80)
  ctx.drawImage(zombie, zombieX, zombieY, 40, 80)
}


function drawFrame(frameX, frameY, canvasX, canvasY) {
  console.log(width, height)
  ctx.drawImage(character, canvasX, canvasY, width, height)
  // (character,frameX * width, frameY, width, height,canvasX, canvasY, width, height);

}

const cycleLoop = [0, 1, 2];
let currentLoopIndex = 0;
let frameCount = 0;

// function step(){
//     frameCount++;
//     if (frameCount < 15) {
//         window.requestAnimationFrame(step);
//         return;
//     }
//     frameCount = 0;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawFrame(cycleLoop[currentLoopIndex], 0, 0, 0,);
//     currentLoopIndex++;
//     if (currentLoopIndex >= cycleLoop.length) {
//         currentLoopIndex = 0;
//     }
//     window.requestAnimationFrame(step);
// }

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
  // keyPresses[event.key] = true;
  if (event.key == ' '){
    keyPresses['space'] = true;
  } else {
    keyPresses[event.key] = true;
  }
}

window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
  // keyPresses[event.key] = false;
  if (event.key == ' ') {
    keyPresses['space'] = false;
  } else {
    keyPresses[event.key] = false;
  }
}

// / old
// keyPress[event.key] = true;

// // new
// if (event.key == ' ') {
//     keyPress['space'] = true;
// } else {
//     keyPress[event.key] = true;
// }


// // old 
// keyPress[event.key] = false;

// // new
// if (event.key == ' ') {
//     keyPress['space'] = false;
// } else {
//     keyPress[event.key] = false;
// }

// // in game loop
// if (keyPress.space) {
//     console.log("SHOOT!")
// }