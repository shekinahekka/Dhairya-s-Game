

//BUGS
//function birds: birds not stopping after end state
//player is jumping even after end state
//slide thing not working 

//TO BE DONE
//two jumps thing 

//End state in draw();
//Play state in draw();
//score using coins
//highest coins collected(highest score)
//moving of background to be done 
//GameOver button




var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player,fallImg, runImg,bgImg,bg,jumpImg,slideImg;
var ground;
var obstacleGroup, obstacle1, obstacle1Img;
var score = 0;

//
var GameOver, GameOverImg;
var birdGrp, bird1, bird1Img;

var slide;
function preload(){

runImg = loadAnimation("run/0.png","run/1.png","run/2.png","run/3.png","run/4.png");
fallImg = loadImage("fall/0.png");
slideImg = loadAnimation("slide/2.png","slide/3.png","slide/4.png")

bgImg = loadImage("anime bg.png");

obstacle1Img=loadImage("barricade.png");
bird1Img=loadAnimation("Bird/0.png","Bird/1.png","Bird/2.png","Bird/3.png","Bird/4.png","Bird/7.png","Bird/8.png","Bird/9.png","Bird/10.png","Bird/11.png","Bird/16.png","Bird/17.png","Bird/18.png","Bird/19.png","Bird/20.png","Bird/29.png","Bird/30.png","Bird/31.png","Bird/32.png","Bird/33.png","Bird/38.png","Bird/39.png")
GameOverImg = loadImage("gameover.png");
}
function setup() {
  createCanvas(displayWidth,displayHeight-150);
 bg = createSprite(500,200,displayWidth,displayHeight);
 bgImg.resize(displayWidth, displayHeight)
 bg.addImage(bgImg);
 //bg.x = bg.width / 2;
 bg.scale = 1.5

  ground=createSprite(288,550,1000,20);
  ground.velocityX = -(6 + 3*score/100);
  ground.x=ground.width/2;
  ground.visible = false; 

  player = createSprite(135,500);
  player.scale=1;
  player.addAnimation("run", runImg);
  player.addImage("fall", fallImg);
  player.addAnimation("slide", slideImg);

  obstacleGroup = new Group();
  birdGrp=new Group();

  GameOver = createSprite(displayWidth-680,displayHeight-430);
  GameOver.scale=1.1;
  GameOver.addImage(GameOverImg);
  score = 0;


}

function draw() {
  //player.debug = true;
  
  background("white");
  //background(bgImg);
  //to be removed after positioning 
  text(mouseX + ',' + mouseY, 10, 15);
 
 if(gameState===PLAY){
  GameOver.visible=false;
  score = frameCount % 200
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  ground.velocityX = -4;

 if(bg.x < 330){
    bg.x = bg.width/2;
  }
 bg.velocityX = -4;
 console.log(bg.x);
 // ground.visible = false;

 
 if(keyDown("up")&& player.y >=250) {
  player.velocityY = -15;
}
player.velocityY = player.velocityY + 0.8;
/*if(keyDown("down")){
  player.changeAnimation("slide",slideImg);
}
console.log(player.velocityY);
*/

if(obstacleGroup.isTouching(player)||birdGrp.isTouching(player)){
 gameState=END;
 sliding();
}
 player.collide(ground);
 enemy();
 birds();
 

}
 
 else if(gameState === END){

  

  ground.velocityX = 0;
  player.velocityY = 0;
  //bg.velocityX=0;

  obstacleGroup.setVelocityXEach(0);
  birdGrp.setVelocityXEach(0);
  
  player.changeImage("fall",fallImg);
  
  obstacleGroup.setLifetimeEach(-1);
  birdGrp.setLifetimeEach(-1);

  if(mousePressedOver(GameOver)) {
    reset();
  }
  GameOver.visible = true;
 }

  drawSprites();
  textSize(30)
  fill("red")
  text("Score " + score, 1200,80)
  
}
function enemy(){
  
 if (frameCount%150===0){
  obstacle1 = createSprite(1580,500);
  obstacle1.scale = 0.4;
  obstacle1.velocityX = -5;
  obstacle1.addImage("obstacleImg", obstacle1Img);
  obstacle1.lifetime = 400;
 // obstacle1.debug = true;
  obstacleGroup.add(obstacle1);

  obstacle1.collide(ground);
  GameOver.depth=obstacle1.depth;
  GameOver.depth=GameOver.depth+1;

 } 
 
}
function birds(){
  if (frameCount%260===0){
    bird1=createSprite(1600,400);
    //bird1.scale=
    bird1.velocityX=-5;
    bird1.addAnimation("bird",bird1Img);
    bird1.lifetime=400;
    birdGrp.add(bird1);
    GameOver.depth=bird1.depth;
    GameOver.depth=GameOver.depth+1;
  
  }
}
function reset(){
  gameState = PLAY;
  GameOver.visible = false;
  obstacleGroup.destroyEach();
  birdGrp.destroyEach();
  player.changeAnimation("run", runImg);
  score = 0;


}
function sliding(){
  slide = setInterval(slideFunc, 3000);
  }
function slideFunc(){
  alert("hello")

    //player.addAnimation("slide",slideImg);

}
//  call sliding funciton on specific conditon
//didnt get you sir
// when you want to use this funciton