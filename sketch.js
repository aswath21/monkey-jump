var bananaImage, obstacleImage, obstacleGroup, bananaGroup, iGround, backgroundImage, backgroundd, score, monkey, monkeyAnimation, monkey1, gameState, banana, ground;

function preload(){
  backgroundImage = loadImage("jungle.jpg")
  
  monkeyAnimation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  
  monkey1 = loadImage("Monkey_01.png")
  
  bananaImage = loadImage("banana.png")
  
  obstacleImage = loadImage("stone.png")
}

function setup() {
  createCanvas(600, 300);
  
  backgroundd = createSprite(500, -85, 1200, 150)
  backgroundd.addImage("background", backgroundImage)
  backgroundd.velocityX = -5
  
  iGround = createSprite(200, 255, 400, 2)
  iGround.visible = false
  
  ground = createSprite(200, 254, 400, 2)
  ground.visible = false
  
  monkey = createSprite(150, 225, 1, 1)
  monkey.addAnimation("monkey", monkeyAnimation)
  monkey.addImage("still", monkey1)
  monkey.scale = 0.1
  
  obstacleGroup = createGroup()
  bananaGroup = createGroup()
  
  score = 0
  
  gameState = "start";
}

function draw() {
  background(220);
  monkey.collide(iGround)
  
  drawSprites()
  
  if (gameState === "start") {
    backgroundd.velocityX = 0;
    monkey.changeImage("still");
    
    stroke("blue")
    textSize(20)
    fill("blue")
    text("press space to start", 190, 150);
  }
  
  if (gameState === "start" && keyDown("space")) {
    gameState = "play";
  }
  
  if (gameState === "play") {
    monkey.changeAnimation("monkey");
    backgroundd.velocityX = -4;
  
    resetGround();
    jump();
    createBanana();
    createObstacles();
    points();
    size();
    
    if (monkey.isTouching(obstacleGroup)) {
      gameState = "end";
    }
  }
  
  if (gameState === "end") {
    monkey.changeImage("still");
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    backgroundd.velocityX = 0;
    monkey.velocityY = 0;
    monkey.scale = 0.1;
    
    obstacleGroup.setLifetimeEach(1/0);
    bananaGroup.setLifetimeEach(1/0);
    
    stroke("blue")
    textSize(20)
    fill("blue")
    text("run code to play again", 170, 150);
  }
 
  stroke("red")
  textSize(20);
  fill("red")
  text("Score: "+score, 500, 50)
}

function resetGround () {
  if (backgroundd.x<=100) {
    backgroundd.x = backgroundd.width/2
  }
}

function createBanana () {
  if (frameCount%80 === 0) {
    var banana = createSprite(600, Math.round(random(50, 120)), 1, 1)
    banana.addImage("banana", bananaImage)
    banana.scale = 0.05
    banana.velocityX = -6
    banana.lifetime = 101
    bananaGroup.add(banana)
  }
}

function points () {
   if (monkey.isTouching(bananaGroup)) {
     bananaGroup.destroyEach()
     score = score + 2
  }
}

function size () {
   switch (score) {
      case 10: monkey.scale = 0.12
              break
      case 20: monkey.scale = 0.14
              break
      case 30: monkey.scale = 0.16
              break
      case 40: monkey.scale = 0.18
              break
      default: break
  }
}
  
function jump () {
  if (keyDown("space") && monkey.isTouching(ground)) {
    monkey.velocityY = -13;
  }
   monkey.velocityY = monkey.velocityY + 0.5;
}
  
function createObstacles () {
  if (frameCount%170 === 0) {
    var stone = createSprite(601, 220, 1, 1);
    stone.addImage(obstacleImage);
    stone.scale = 0.15;
    stone.velocityX = -5;
    stone.lifetime = 151;
    obstacleGroup.add(stone);
  }
}