var bg,honeyImg,beeAnim, flower1,flower2,flower3
var bee,honey,flower,flowerGroup

var score = 0;

var gameState="start"


function preload() {
  bgStart = loadImage("Images/bg_start.png");
  bgPlay = loadImage("Images/bg_play.png");
  bgWon = loadImage("Images/gameWon.png");
  bgEnd = loadImage("Images/gameOver.webp");

  honeyImg = loadImage("Images/honey.png")
  beeAnim = loadAnimation("Images/bee1.png", "Images/bee2.png", "Images/bee3.png", "Images/bee4.png", "Images/bee5.png",);

  flower1 = loadImage("Images/flower1.png");
  flower2 = loadImage("Images/flower2.png");
  flower3 = loadImage("Images/flower3.png");
}


function setup() {
  createCanvas(600, 500);

  bee = createSprite(350, 300);
  bee.addAnimation("bee", beeAnim);
  bee.scale = 0.6;

  honey = createSprite(550, 380, 50, 50);
  honey.addImage("honey", honeyImg)
  honey.scale = 0.4;


  // bee.debug = true;
  bee.setCollider("circle",0,0,50)

  flowerGroup = new Group();

}


function draw() {
  
  if(gameState === "play"){
    background(bgPlay);
    if (keyDown("left")) {
      bee.x = bee.x - 10;
    }
    if (keyDown("right")) {
      bee.x = bee.x + 10;
    }
    
    if(bee.isTouching(flowerGroup)){
      flowerGroup.destroyEach();
     score = score + 5;
    }  
    
    spwanFlowers();

    if(frameCount >= 500){
      honey.destroy()
      if(score >=50){
        gameState = "win"
      }
      else{
        gameState = "end"
      }
    }
    
  }

  if(gameState === "win"){
    background(bgWon)
  }

  drawSprites();
  textSize(20);
  text("Score: "+score, 50,50);

  if(gameState === "start"){
    background(bgStart);
  }

  if(gameState === "end"){
    background("#488FB1");
    textSize(50);
    fill("white")
    text("Game Over..!!",150,250)
  }

}

function mouseClicked(){
  if(gameState === "start"){
    gameState = "play"
  }
}

function spwanFlowers() {
  if (frameCount % 50 === 0) {
    flower = createSprite(random(50, 550), 0, 30, 30);
    flower.velocityY = 10;
    flower.scale = 0.4;
    flowerGroup.add(flower)

    var rand = Math.round(random(1, 3))
    if (rand === 1) {
      flower.addImage(flower1)
    }
    else if (rand === 2) {
      flower.addImage(flower2)
    }
    else {
      flower.addImage(flower3)
    }
  }
}

