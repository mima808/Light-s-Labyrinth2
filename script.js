// Global Variables
let player, walls;
let playButton, htpButton, backButton, muteButton;
let score = 0;
let screen = 0;
let overlayGraphics;
let person1img, lanternimg, mazeimg, maze2img, gameimg, rulesimg, playerimg, lastimg, mushimg, badmushimg, webimg;
let greatVibes, lss;
let revealedAreaSize = 80;
let hasCollided1 = false;
let hasCollided2 = false;
let hasCollided3 = false;
let showOverlay = false;
let showOverlayLevel2 = false;
let hasWon = false;
let winPlayed = false;
let isMuted = false;
let lantern4, lantern5, lantern6, lantern7;
let hasCollided4 = false, hasCollided5 = false, hasCollided6 = false, hasCollided7 = false;
let currentLevel = 1;
let mushroomGroup;
let webGroup;
let MAX_SPEED = 3;
let isSlowedDown = false;
let slowDownEndTime = 0;
//let lanternsCollected = 0;
let maze3img;
let lantern8, lantern9, lantern10, lantern11, lantern12;
let hasCollided8 = false, hasCollided9 = false, hasCollided10 = false, hasCollided11 = false, hasCollided12 = false;
let showOverlayLevel3 = false;
let movingObject, movingObject2, movingObject3
let showMessage = false;
let messageText 
let messageStartTime = 0;


//let lanternsCollectedPerLevel = [0, 0, 0]; // For levels 1, 2, and 3


// Setup for positioning and other constants
const scoreX = 348;
const scoreY = 40;
const scoreRevealWidth = 80;
const scoreRevealHeight = 16;
const muteX = 348;
const muteY = 15;
const muteRevealWidth = 60;
const muteRevealHeight = 20;
const ACCELERATION = 0.2;
const FRICTION = 0.9;
const MIN_REVEALED_AREA_SIZE = 40
/* PRELOAD FUNCTION */
function preload() {
  //Images
  person1img = loadImage('assets/person1.png');
  lanternimg = loadImage('assets/lantern.png');
  mazeimg = loadImage('assets/maze.png');
  maze2img = loadImage('assets/2maze.png');
  maze3img = loadImage('assets/3maze.jpeg')
  gameimg = loadImage('assets/game.png');
  rulesimg = loadImage('assets/rules.png');
  playerimg = loadImage('assets/player.png');
  lastimg = loadImage('assets/last.png');
  mushimg = loadImage('assets/mush.png');
  badmushimg = loadImage('assets/badmush.png');
  webimg = loadImage('assets/webb.png')
  //Fonts
  greatVibes = loadFont('assets/greatvibes.ttf');
  lss = loadFont('assets/lss.otf');
  //Sound
  win = loadSound('assets/win.wav');
  light = loadSound('assets/light.wav');
  point = loadSound('assets/point.mp3');
  forest = loadSound('assets/forest.mp3');
  click = loadSound('assets/click.wav');
}

/* SETUP FUNCTION */
function setup() {
  createCanvas(400, 400);
  forest.loop();

  // Resize images
  person1img.resize(0, 30);
  lanternimg.resize(0, 35);
  playerimg.resize(0, 40);
  mushimg.resize(0, 60);
  badmushimg.resize(0, 35);
  webimg.resize(0, 35);
  // Set sound volumes
  forest.setVolume(0.1);
  point.setVolume(0.6);
  light.setVolume(0.7);
  win.setVolume(0.7);
  click.setVolume(0.8);

  homeScreenAssets();
  overlayGraphics = createGraphics(400, 400);

  // Create back button
  backButton = new Sprite(width - 50, height - 30, 80, 30, 'k');
  backButton.color = "#174440";
  backButton.textColor = "white";
  backButton.textSize = 14;
  backButton.text = "Back";
  backButton.pos = { x: -100, y: -100 };

  // Create mute button
  muteButton = new Sprite(348, 15, 60, 20, 'k');
  muteButton.color = "#174440";
  muteButton.textColor = "white";
  muteButton.textSize = 12;
  muteButton.text = "Mute";
}

/* DRAW LOOP FUNCTION */
function draw() {
  if (screen === 0) {
    drawHomeScreen();
  } else if (screen === 1) {
    drawGameScreen();
  } else if (screen === 2) {
    drawMuteButton();
    endScreenAssets();
  } else if (screen === 4) {
    rulesScreenAssets();
    backButton.pos = { x: 350, y: 380 };
  } else {
    backButton.pos = { x: -100, y: -100 };
  }

  handleEventListeners();
  drawMuteButton();
}

// Utility functions to draw different screens and handle events
function homeScreenAssets() {
  background(gameimg);

  // Create title
  fill("#dbe187");
  textSize(35);
  textFont(lss);
  strokeWeight(0);
  textAlign(CENTER);
  text("Light's Labyrinth", width / 2, 70);

  // Create message
  fill("#238580");
  textSize(15);
  textAlign(CENTER);
  stroke(255);
  strokeWeight(4);
  text("In a world covered \nin darkness, your journey to \nfind the light begins \nnow", width / 2, 135);
  strokeWeight(0);

  // Create play button
  textFont(lss);
  playButton = new Sprite(width / 2, 280, 100, 30, 'k');
  playButton.color = "#174440";
  playButton.textColor = "white";
  playButton.stroke = color(103, 213, 0, 0);
  playButton.textSize = 14;
  playButton.text = "Play";

  // Create How to Play button
  htpButton = new Sprite(width / 2, 230, 100, 30, 'k');
  htpButton.color = "#174440";
  htpButton.textColor = "white";
  htpButton.stroke = color(103, 230, 0, 0);
  htpButton.textSize = 14;
  htpButton.text = "How to Play";
}

function rulesScreenAssets() {
  background(rulesimg);

  // Move play and how to play buttons offscreen
  htpButton.pos = { x: -100, y: -100 };
  playButton.pos = { x: -100, y: -100 };

  // Create message
  fill("white");
  textSize(16);
  textAlign(CENTER);
  stroke("black");
  strokeWeight(3);
  text(
    "Objective: \nFind all the lanterns to light up \nthe maze, \nand remove the mushroom \nblocking the maze's end.\n\nGameplay: \nThe screen will start covered in darkness. \nYou'll have the maze revealed for 6 seconds \nat the beginning to quickly navigate \nand get your bearings. \n\n Mechanics: \nMove using your arrow keys.",
    width / 2,
    60
  );
  strokeWeight(0);
}

function playScreenAssets() {
  background(mazeimg);

  // Move play and how to play buttons offscreen
  playButton.pos = { x: -200, y: -100 };
  htpButton.pos = { x: -200, y: -100 };

  // Create player sprite
  player = new Sprite(playerimg, 370, 50, 11, 11);
  player.color = color(255);
  player.rotationLock = true;

  // Create lanterns
  lantern1 = new Sprite(lanternimg, 220, 130, 's');
  lantern2 = new Sprite(lanternimg, 125, 275, 's');
  lantern3 = new Sprite(lanternimg, 180, 80, 's');

  // Create end sprite
  endSprite = new Sprite(mushimg, 45, 365, 70, 70, 'k');
  endSprite.color = "#7fae11";
  strokeWeight(0);

  // Create the maze
  walls = new Group();
  walls.stroke = color(103, 213, 0, 0);
  walls.color = color(103, 212, 0, 0);
  walls.collider = "s";

  // Maze Walls creation
  //Borders
  new walls.Sprite(150, 4.9, 340, 10);
  new walls.Sprite(4.9, 200, 16, 500);
  new walls.Sprite(235, 394.9, 330, 10);
  new walls.Sprite(395, 195, 10, 390);
  //Walls
  new walls.Sprite(54, 249, 10, 206);
  new walls.Sprite(110, 151, 100, 10);
  new walls.Sprite(80, 347, 60, 10);
  new walls.Sprite(107, 366, 10, 48);
  new walls.Sprite(104, 102, 188, 10);
  new walls.Sprite(202, 298, 185, 10);
  new walls.Sprite(155, 328, 10, 48);
  new walls.Sprite(184, 347, 48, 10);
  new walls.Sprite(203, 370, 10, 48);
  new walls.Sprite(106, 253, 10, 100);
  new walls.Sprite(203, 154, 10, 190);
  new walls.Sprite(155, 54, 202, 10);
  new walls.Sprite(130, 200, 58, 10);
  new walls.Sprite(155, 225, 10, 57);
  new walls.Sprite(225, 151, 53, 10);
  new walls.Sprite(227, 249, 57, 10);
  new walls.Sprite(251, 175, 10, 58);
  new walls.Sprite(299, 70, 10, 172);
  new walls.Sprite(327, 151, 51, 10);
  new walls.Sprite(276, 200, 58, 10);
  new walls.Sprite(327, 54, 58, 10);
  new walls.Sprite(275, 102, 40, 10);
  new walls.Sprite(370, 102, 58, 10);
  new walls.Sprite(299, 298, 10, 108);
  new walls.Sprite(370, 298, 58, 10);
  new walls.Sprite(300, 347, 105, 10);
  new walls.Sprite(325, 249, 55, 10);
  new walls.Sprite(347, 225, 10, 57);
  

  // Set a timeout to show the overlay after 2.5 seconds
  setTimeout(() => {
    showOverlay = true;
  }, 2500);
}

function showMessageInCenter(text, duration) {
  
  messageText = text;
  messageStartTime = millis();
  showMessage = true;
  setTimeout(() => {
    showMessage = false;
  }, duration);
}


function transitionToLevel2() {
  currentLevel = 3;
   //lanternsCollectedPerLevel[2] = score; // Store lanterns collected in level 1
  setupLevel2();
   player.pos = {x: 370, y: 50};
  // Hide the overlay for 2.5 seconds
  showOverlay = false;
  showOverlayLevel2 = false;
  setTimeout(() => {
    showOverlayLevel2 = true;
  }, 6000);
}
function setupLevel2() {
  background(maze2img);
  endSprite.remove();
  player.pos = {x: 370, y: 50}; // Reset player position

  // Remove old walls
  walls.removeAll();
webGroup.removeAll();
  // Remove old lanterns
 
  lantern9.remove();
  lantern10.remove();
  lantern11.remove();
  lantern12.remove();
  
  revealedAreaSize = 80;

  showMessageInCenter("Shrooms in your way? \nThey'll cloud your vision and weigh\nyou down.", 3300);
  
  // Create mushroom group
  mushroomGroup = new Group();
 
  // Add mushroom sprites
 // new mushroomGroup.Sprite(badmushimg, 180, 90, 30, 30);
 // new mushroomGroup.Sprite(badmushimg, 230, 170, 30, 30, 's');
 // new mushroomGroup.Sprite(badmushimg, 210, 380, 30, 30, 's');

  // Create the moving object (using badmushimg)
  movingObject = new Sprite(badmushimg, 180, 90, 30, 30, 'k'); 
  movingObject.vel.x = 2; // Initial horizontal speed
  mushroomGroup.add(movingObject); 

  movingObject2 = new Sprite(badmushimg, 187, 130, 30, 30, 'k'); 
  movingObject2.vel.y = 1; // Initial horizontal speed
  mushroomGroup.add(movingObject2); 

  movingObject3 = new Sprite(badmushimg, 210, 387, 30, 30, 'k'); 
  movingObject3.vel.x = 1; // Initial horizontal speed
  mushroomGroup.add(movingObject3); 
  
  // Create new walls for level 2
  createWallsForLevel2();

  endSprite = new Sprite(mushimg, 45, 365, 60, 30, 'k');
  endSprite.color = "#7fae11";
  strokeWeight(0);
  

  // Create 4 new lanterns for level 2
  lantern4 = new Sprite(lanternimg, 250, 33, 's');
  lantern5 = new Sprite(lanternimg, 130, 220, 's');
  lantern6 = new Sprite(lanternimg, 280, 325, 's');
  lantern7 = new Sprite(lanternimg, 180, 373, 's');
  lantern8 = new Sprite(lanternimg, 280, 85, 's');
  // Reset collision states for new level
  hasCollided4 = false;
  hasCollided5 = false;
  hasCollided6 = false;
  hasCollided7 = false;
  hasCollided8 = false;

  // Reset score and revealed area size for new level
  score = 0;


  // Reset win condition
  hasWon = false;
}

function createWallsForLevel2() {
  walls = new Group();
  walls.stroke = color(103, 213, 0, 0);
  walls.color = color(103, 212, 0, 0);
  walls.collider = "s";
  //Borders
  new walls.Sprite(150, 4.9, 340, 10);
  new walls.Sprite(4.9, 200, 16, 500);
  new walls.Sprite(235, 394.9, 330, 10);
  new walls.Sprite(395, 195, 10, 390);
  //Walls
  new walls.Sprite(54, 249, 10, 206);
  new walls.Sprite(110, 151, 100, 10);
  new walls.Sprite(80, 347, 60, 10);
  new walls.Sprite(107, 366, 10, 48);
  new walls.Sprite(123, 102, 155, 10);
  new walls.Sprite(202, 298, 185, 10);
  new walls.Sprite(155, 328, 10, 48);
  new walls.Sprite(184, 347, 48, 10);
  new walls.Sprite(203, 370, 10, 48);
  new walls.Sprite(106, 253, 10, 100);
  new walls.Sprite(203, 154, 10, 190);
  new walls.Sprite(175, 54, 240, 10);
  new walls.Sprite(130, 200, 58, 10);
  new walls.Sprite(155, 225, 10, 57);
  new walls.Sprite(225, 151, 53, 10);
  new walls.Sprite(227, 249, 57, 10);
  new walls.Sprite(251, 175, 10, 58);
  new walls.Sprite(299, 70, 10, 172);
  new walls.Sprite(327, 151, 51, 10);
  new walls.Sprite(276, 200, 58, 10);
  new walls.Sprite(327, 54, 58, 10);
  new walls.Sprite(275, 102, 40, 10)
  new walls.Sprite(370, 102, 58, 10);
  new walls.Sprite(299, 298, 10, 108);
  new walls.Sprite(370, 298, 58, 10);
  new walls.Sprite(300, 347, 105, 10);
  new walls.Sprite(325, 249, 55, 10);
  new walls.Sprite(347, 225, 10, 57);
}

function transitionToLevel3() {
  currentLevel = 2;
 // lanternsCollectedPerLevel[1] = score;
  setupLevel3();
  player.pos = {x: 370, y: 50};
  // Hide the overlay for 2.5 seconds
  showOverlay = false;
  showOverlayLevel2 = false;
  setTimeout(() => {
    showOverlayLevel3 = true;
  },6000);
}

function setupLevel3() {
  background(maze2img); 
  endSprite.remove();
  player.pos = {x: 370, y: 50}; // Reset player position

  // Remove old lanterns
  lantern1.remove();
  lantern2.remove();
  lantern3.remove();
walls.removeAll();
  revealedAreaSize = 80;

  showMessageInCenter("Tread carefully,\n the webs will tangle your steps!"
, 3300);
  
  // Create new web group for level 3
  webGroup = new Group();
  webGroup.collider = 's';
  // Add more mushroom sprites for increased difficulty
  new webGroup.Sprite(webimg, 180, 75, 30, 30);
  new webGroup.Sprite(webimg, 230, 175, 30, 30);
  new webGroup.Sprite(webimg, 180, 320, 30, 30);
  new webGroup.Sprite(webimg, 275, 75, 20, 20);
  new webGroup.Sprite(webimg, 370, 315, 15, 15);

  // Create new walls for level 3
  createWallsForLevel3();

  endSprite = new Sprite(mushimg, 45, 365, 60, 30, 'k');
  endSprite.color = "#7fae11";
  strokeWeight(0);



  // Create 4 new lanterns for level 2

  lantern9 = new Sprite(lanternimg, 130, 220, 's');
  lantern10 = new Sprite(lanternimg, 280, 325, 's');
  lantern11 = new Sprite(lanternimg, 180, 373, 's');
  lantern12 = new Sprite(lanternimg, 280, 33, 's');

  // Reset collision states for new level
 
  hasCollided9 = false;
  hasCollided10 = false;
  hasCollided11 = false;
  hasCollided12 = false;

  // Reset score and revealed area size for new level
  score = 0;

  // Reset win condition
  hasWon = false;
}

function createWallsForLevel3() {
  walls = new Group();
  walls.stroke = color(103, 213, 0, 0);
  walls.color = color(103, 212, 0, 0);
  walls.collider = "s";
  //Borders
  new walls.Sprite(150, 4.9, 340, 10);
  new walls.Sprite(4.9, 200, 16, 500);
  new walls.Sprite(235, 394.9, 330, 10);
  new walls.Sprite(395, 195, 10, 390);
  //Walls
  new walls.Sprite(54, 249, 10, 206);
  new walls.Sprite(110, 151, 100, 10);
  new walls.Sprite(80, 347, 60, 10);
  new walls.Sprite(107, 366, 10, 48);
  new walls.Sprite(123, 102, 155, 10);
  new walls.Sprite(202, 298, 185, 10);
  new walls.Sprite(155, 328, 10, 48);
  new walls.Sprite(184, 347, 48, 10);
  new walls.Sprite(203, 370, 10, 48);
  new walls.Sprite(106, 253, 10, 100);
  new walls.Sprite(203, 154, 10, 190);
  new walls.Sprite(175, 54, 240, 10);
  new walls.Sprite(130, 200, 58, 10);
  new walls.Sprite(155, 225, 10, 57);
  new walls.Sprite(225, 151, 53, 10);
  new walls.Sprite(227, 249, 57, 10);
  new walls.Sprite(251, 175, 10, 58);
  new walls.Sprite(299, 70, 10, 172);
  new walls.Sprite(327, 151, 51, 10);
  new walls.Sprite(276, 200, 58, 10);
  new walls.Sprite(327, 54, 58, 10);
  new walls.Sprite(275, 102, 40, 10)
  new walls.Sprite(370, 102, 58, 10);
  new walls.Sprite(299, 298, 10, 108);
  new walls.Sprite(370, 298, 58, 10);
  new walls.Sprite(300, 347, 105, 10);
  new walls.Sprite(325, 249, 55, 10);
  new walls.Sprite(347, 225, 10, 57);
}

function endScreenAssets() {
  background(lastimg);
  if (!winPlayed) {
    win.play();
    winPlayed = true;
  }

  // Draw sprites off the screen
  player.vel.x = 0;
  player.vel.y = 0;
  player.pos = { y: 4000 };
  walls.x = -1000;

  fill("#184656");
  textSize(17);
  textAlign(CENTER);
  stroke(255);
  strokeWeight(3);
  text("Congratulations! \n\nYou've conquered the darkness \nand found the light. \n\nThank you for playing Light's Labyrinth. \nUntil next time, keep seeking the light!", width / 2, height/2 - 60);
}

/* DRAW FUNCTIONS FOR INDIVIDUAL SCREENS */
function drawHomeScreen() {
  if (playButton.mouse.presses()) {
    screen = 1;
    playScreenAssets();
    click.play();
  }
  if (htpButton.mouse.presses()) {
    screen = 4;
    rulesScreenAssets();
    click.play();
  }
}

function drawGameScreen() {
  if (currentLevel === 1) {
    background(mazeimg);
  } else if (currentLevel === 2) {
    background(maze2img);
    webSlowDown();
  } else if (currentLevel === 3) {
    checkSlowDownEffect();
    background(maze2img);
  }
  
  player.x = constrain(player.x, 0, width); // Keep player within horizontal bounds

  if (showMessage) {
    textSize(19);
    textAlign(CENTER);
    fill("#8bc298");
    stroke("#184656")
    strokeWeight(3)
    text(messageText, width / 2,  height/2 - 50);
  }
  
  if (currentLevel === 3) {
    // Bounce off walls
    if (movingObject.x < 5 || movingObject.x > 180) {
      movingObject.vel.x *= -1;
    }
    movingObject.x += movingObject.vel.x;
//
    if (movingObject2.y < 118 || movingObject2.y > 285) {
      movingObject2.vel.y *= -1;
    }
    movingObject2.y += movingObject2.vel.y;
//
    if (movingObject3.x < 210 || movingObject3.x > 385) {
      movingObject3.vel.x *= -1;
    }
    movingObject3.x += movingObject3.vel.x;
  }

  // Handle player movement with acceleration
  if (kb.pressing("left")) {
    player.vel.x = max(player.vel.x - ACCELERATION, -MAX_SPEED);
  } else if (kb.pressing("right")) {
    player.vel.x = min(player.vel.x + ACCELERATION, MAX_SPEED);
  } else {
    player.vel.x *= FRICTION;
  }
  if (kb.pressing("up")) {
    player.vel.y = max(player.vel.y - ACCELERATION, -MAX_SPEED);
  } else if (kb.pressing("down")) {
    player.vel.y = min(player.vel.y + ACCELERATION, MAX_SPEED);
  } else {
    player.vel.y *= FRICTION;
  }

  if (currentLevel === 1 && score >= 3 && !hasWon) {
    endSprite.pos = { x: 45, y: 365 };
    light.play();
    hasWon = true;
    endSprite.vel.x = -0.5;
  } else if (currentLevel === 2 && score >= 4 && !hasWon) {
    endSprite.pos = { x: 45, y: 365 };
    light.play();
    hasWon = true;
    endSprite.vel.x = -0.5;
  } else if (currentLevel === 3 && score >= 5 && !hasWon) {
    endSprite.pos = { x: 45, y: 365 };
    light.play();
    hasWon = true;
    endSprite.vel.x = -0.5;
  }

  if (currentLevel === 1 && hasWon && player.y > 400) {
    transitionToLevel3();
  } else if (currentLevel === 2 && hasWon && player.y > 400) {
    transitionToLevel2();
  } else if (currentLevel === 3 && player.y > 400 && player.x <= 64) {
    screen = 2; // Switch to end screen
    endScreenAssets();
  }

  // Player wins after completing level 3
  if (currentLevel === 3 && player.y > 400 && player.x <= 64) {
    screen = 2; // Switch to end screen
    endScreenAssets();
  }

  if (currentLevel === 2) {
    // Check for mushroom collisions
    if (player.collides(webGroup)) {
      handleWebCollisions();
    }
  }
  if (currentLevel === 3) {
    // Check for mushroom collisions
    if (player.collides(mushroomGroup)) {
      handleMushroomCollision();
    }
  }



  // Lantern collision logic
  handleLanternCollisions();

  // Ensure player remains within maze boundaries
  if (player.y < 20) {
    player.y = 20;
  }

  // Display score
  fill("white");
  textSize(16);
  strokeWeight(0);
  text("Score = " + score, 348, 43);

  // Draw all sprites
  drawSprites();

  // Draw overlay
  if ((showOverlay && currentLevel === 1) || 
      (showOverlayLevel3 && currentLevel === 2) || 
      (showOverlayLevel2 && currentLevel === 3)) {
    if ((currentLevel === 1 && score !== 3) || 
        (currentLevel === 2 && score !== 4) ||
        (currentLevel === 3 && score !== 5)) {
      drawOverlay();
    }
  }
}


function handleLanternCollisions() {
  if (currentLevel === 1) {
    if (player.collides(lantern1) && !hasCollided1) {
      revealedAreaSize += 40;
     // lanternsCollectedPerLevel[1]++;
      hasCollided1 = true;
      score++;
      if (score < 3) point.play();
    }
    if (player.collides(lantern2) && !hasCollided2) {
      revealedAreaSize += 40;
     // lanternsCollectedPerLevel[1]++;
      hasCollided2 = true;
      score++;
      if (score < 3) point.play();
    }
    if (player.collides(lantern3) && !hasCollided3) {
      revealedAreaSize += 40;
      //lanternsCollectedPerLevel[1]++;
      hasCollided3 = true;
      score++;
      if (score < 3) point.play();
    }
  } else if (currentLevel === 2) {
   
    if (player.collides(lantern9) && !hasCollided9) {
      revealedAreaSize += 40;
     // lanternsCollectedPerLevel[3]++;
      hasCollided9 = true;
      score++;
      if (score < 4) point.play();
  }
    if (player.collides(lantern10) && !hasCollided10) {
      revealedAreaSize += 40;
     // lanternsCollectedPerLevel[3]++;
      hasCollided10 = true;
      score++;
      if (score < 4) point.play();
    }
    if (player.collides(lantern11) && !hasCollided11) {
      revealedAreaSize += 40;
     // lanternsCollectedPerLevel[3]++;
      hasCollided11 = true;
      score++;
      if (score < 4) point.play();
    }
    if (player.collides(lantern12) && !hasCollided12) {
      revealedAreaSize += 40;
     // lanternsCollectedPerLevel[3]++;
      hasCollided12 = true;
      score++;
      if (score < 4) point.play();
    }
  } else if (currentLevel === 3) {
      if (player.collides(lantern4) && !hasCollided4) {
        revealedAreaSize += 40;
        //lanternsCollectedPerLevel[2]++;
        hasCollided4 = true;
        score++;
        if (score < 5) point.play();
      }
      if (player.collides(lantern5) && !hasCollided5) {
        revealedAreaSize += 40;
       // lanternsCollectedPerLevel[2]++;
        hasCollided5 = true;
        score++;
        if (score < 5) point.play();
      }
      if (player.collides(lantern6) && !hasCollided6) {
        revealedAreaSize += 40;
       // lanternsCollectedPerLevel[2]++;
        hasCollided6 = true;
        score++;
        if (score < 5) point.play();
      }
    if (player.collides(lantern7) && !hasCollided7) {
      revealedAreaSize += 40;
      hasCollided7 = true;
      score++;
      if (score < 5) point.play();
    }

    if (player.collides(lantern8) && !hasCollided8) {
      revealedAreaSize += 40;
      //lanternsCollectedPerLevel[3]++;
      hasCollided8 = true;
      score++;
      if (score < 5) point.play();
    }
    }
}

function handleMushroomCollision() {
  if (!isSlowedDown) {
    isSlowedDown = true;

    // Log current values before any changes
    console.log("Before:", { revealedAreaSize, MIN_REVEALED_AREA_SIZE });

    // Apply the changes
    MAX_SPEED /= 2; // Reduce max speed by half
    revealedAreaSize = Math.max(MIN_REVEALED_AREA_SIZE, revealedAreaSize - 40);

    // Log values after changes
    console.log("After:", { revealedAreaSize });

    slowDownEndTime = millis() + 4000; // Set end time 4 seconds from now
  }
}

function checkSlowDownEffect() {
  if (isSlowedDown && millis() > slowDownEndTime) {
    isSlowedDown = false;
    MAX_SPEED *= 2; // Reset to original speed

    revealedAreaSize = (score*40 + 80)  
  }
}

function handleWebCollisions() {
  if (!isSlowedDown) {
    isSlowedDown = true;
    MAX_SPEED /= 2; // Reduce max speed by half
    slowDownEndTime = millis() + 4000; // Set end time 4 seconds from now
  }
}

function webSlowDown() {
  if (isSlowedDown && millis() > slowDownEndTime) {
    isSlowedDown = false;
    MAX_SPEED *= 2; // Reset to original speed
  }
}

function drawOverlay() {
  if ((currentLevel === 1 && score !== 3) || 
      (currentLevel === 2 && score !== 4 && showOverlayLevel3) ||
      (currentLevel === 3 && score !== 5 && showOverlayLevel2)) {
    overlayGraphics.clear();
    overlayGraphics.background(0);
    overlayGraphics.erase();
    overlayGraphics.ellipse(player.x, player.y, revealedAreaSize, revealedAreaSize);
    overlayGraphics.rect(scoreX - scoreRevealWidth / 2, scoreY - scoreRevealHeight / 2, scoreRevealWidth, scoreRevealHeight);
    overlayGraphics.rect(muteX - muteRevealWidth / 2, muteY - muteRevealHeight / 2, muteRevealWidth, muteRevealHeight);
    overlayGraphics.noErase();
    image(overlayGraphics, 0, 0);
  }
}

function handleEventListeners() {
  if (backButton.mouse.presses()) {
    screen = 0;
    backButton.pos = { x: -100, y: -100 };
    homeScreenAssets();
    hasWon = false;
    winPlayed = false;
    click.play();
  }
}

  function drawMuteButton() {
    muteButton.pos = { x: 348, y: 15 }; // Consistent position
    if (muteButton.mouse.presses()) {
      isMuted = !isMuted;
      muteButton.text = isMuted ? "Unmute" : "Mute";
      forest.setVolume(isMuted ? 0 : 0.1);
    }
  }