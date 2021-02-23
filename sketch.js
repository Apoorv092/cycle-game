var path,mainCyclist,PinkC,YellowC,RedC;
var pathImg,mainRacerImg1,mainRacerImg2,pinkimg1,pinkimg2,yellowimg1,yellowimg2,redimg1,redimg2,obstacle1img,obstacle2img,obstacle3img,gameoverimg;
var cycleSOUND;
var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  pinkimg1=loadAnimation("opponent1.png","opponent2.png");
  pinkimg2=loadAnimation("opponent3.png")
  yellowimg1=loadAnimation("opponent4.png","opponent5.png")
  yellowimg2=loadAnimation("opponent6.png")
  
  redimg1=loadAnimation("opponent7.png","opponent8.png")
  redimg2=loadAnimation("opponent9.png")
  
  gameoverimg=loadImage("gameOver.png")
  obstacle1img=loadImage("obstacle1.png")
    obstacle2img=loadImage("obstacle2.png")
    obstacle3img=loadImage("obstacle3.png")
  cyclebellSOUND=loadSound("sound/bell.mp3")
}

function setup(){
  
createCanvas(1000,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);

  path.scale=0.5

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.addAnimation("sahilfalldown",mainRacerImg2)
 
mainCyclist.scale=0.06;
  
   gameover=createSprite(390,150,10,10)
  gameover.addImage(gameoverimg)
  gameover.scale=0.7

  gameover.visible=false 
  

  
mainCyclist.debug=false
  mainCyclist.setCollider("circle",0,0,680)






  RedCGroup=new Group()
  YellowCGroup=new Group()
  PinkCGroup=new Group()
  
}

function draw() {
  background(0);
 
  if(gameState===PLAY){
    
 path.velocityX = -(6 +2*distance/150);
    
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);

  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
   
  distance=distance + Math.round(getFrameRate()/50)    
    if(keyDown("space")){
       cyclebellSOUND.play()
       }
    
 num=Math.round(random(1,3));
    
    if(frameCount% 150===0)  {
      
     if(num==1){
        PinkC()
        }else if (num==2){
            RedC()      
        }else {
          YellowC()
        }
     }
    
    
  
    
 if(PinkCGroup.isTouching(mainCyclist)){
   gameState=END
  
   PinkCGroup.setVelocityXEach(0)
  pinkC.setLifetime=-1
   path.velocityX=0
  pinkC.changeAnimation("pinkOC",pinkimg2)
  

 }
    if(RedCGroup.isTouching(mainCyclist)){
   gameState=END
 
   RedCGroup.setVelocityXEach(0)
   redC.setLifetime=-1
   path.velocityX=0
 redC.changeAnimation("redR",redimg2)
  
 }
    if(YellowCGroup.isTouching(mainCyclist)){
   gameState=END

   YellowCGroup.setVelocityXEach(0)
   yellowC.setLifetime=-1
   path.velocityX=0
yellowC.changeAnimation("yellowOC",yellowimg2)
  
   
 }
    
 }
  
  
  
   drawSprites();
  
if(gameState===END){
    mainCyclist.changeAnimation("sahilfalldown",mainRacerImg2)
 
     gameover.visible=true
    distance=0
  fill(255)
    textSize(14)
    text("Press UP ARROW to restart the game",290,200)
    
    
    
  
   if(keyDown("UP_ARROW")){
  reset()
}  
  }  
  
  
  
  textSize(20);
  fill(255)
  text("Distance: "+ distance,350,30);
  
}

function reset(){
  gameState=PLAY
  mainCyclist.changeAnimation("SahilRunning",mainRacerImg1)
  gameover.visible=false
 
  PinkCGroup.destroyEach()
  YellowCGroup.destroyEach()
  RedCGroup.destroyEach()
  
  
  
  distance=0;
}
function PinkC(){
  pinkC=createSprite(1100,Math.round(random(50,250)),10,10)
  pinkC.scale=0.06
  pinkC.addAnimation("pink",pinkimg1)
  pinkC.addAnimation("pinkOC",pinkimg2)
  pinkC.velocityX=-(6+2*distance/150)
 pinkC.setLifetime=170

 pinkC.debug=false
 pinkC.setCollider("circle",0,0,350)


  PinkCGroup.add(pinkC)


}
function RedC(){
  redC=createSprite(1100,Math.round(random(50,250)),10,10)
  redC.addAnimation("red",redimg1)
   redC.addAnimation("redR",redimg2)
  redC.scale=0.06
  redC.velocityX=-(6+2*distance/150)
redC.setLifetime=170

redC.debug=false
 redC.setCollider("circle",0,0,350)
  RedCGroup.add(redC)
}
function YellowC(){
  yellowC=createSprite(1100,Math.round(random(50,250)),10,10)
  yellowC.addAnimation("yellow",yellowimg1)
   yellowC.addAnimation("yellowOC",yellowimg2)
  yellowC.scale=0.06
  yellowC.velocityX=-(6+2*distance/150)
  yellowC.setLifetime=170

  yellowC.debug=false
 yellowC.setCollider("circle",0,0,350)

  YellowCGroup.add(yellowC)
}
