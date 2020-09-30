var backdrop, jungle, monkey, monkeyAnimation, rock, rockImage, banana, bananaImage, ground, invisibleGround, bananaGroup, rockGroup, score;

function preload(){

  jungle = loadImage("jungle.jpg");
  rockImage = loadImage("stone.png");
  bananaImage = loadImage("banana.png");
  
  monkeyAnimation = loadAnimation ("Monkey_01.png",
  "Monkey_02.png","Monkey_03.png","Monkey_04.png",
  "Monkey_05.png","Monkey_06.png","Monkey_07.png",
  "Monkey_08.png","Monkey_09.png","Monkey_10.png");
}
  
function setup() {
  createCanvas(600,200);
  
  text(mouseX + "," + mouseY, mouseX, mouseY);
  
  backdrop = createSprite(300,10,50,50);
  backdrop.addAnimation("background",jungle);
  backdrop.scale = 1.1
  
  monkey = createSprite (40,160,50,50);
  monkey.addAnimation("monkeyRun",monkeyAnimation);
  monkey.scale = 0.1;

  ground = createSprite(300,190,600,10);
  
  ground.visible = false;
  //backdrop.visible = false;
 
  bananaGroup = new Group();
  rockGroup = new Group();

  
  score = 0

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 10, 25 );
   
}



function draw() {
  
  background(220);
  
  drawSprites();
  
  //console.log(monkey.scale);
  
  text.depth = backdrop.depth + 5;
  
  //text(mouseX + "," + mouseY, mouseX, mouseY);
 
  backdrop.velocityX = -2;
  
  if (backdrop.x < 60
     ){
  backdrop.x = 300;
  }
  
  if (keyDown ("space")){
  monkey.velocityY = -10
  }
  
  monkey.velocityY = monkey.velocityY + 0.5;
  
  monkey.collide(ground);
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score = score + 2;
    if(monkey.scale< 0.13){
      monkey.scale = monkey.scale + 0.01
    }
  }
  
  if(rockGroup.isTouching(monkey)){
    rockGroup.destroyEach();
    if(score > 0){
    score = score -2;
    }
    
     if(monkey.scale > 0.1){
      monkey.scale = monkey.scale - 0.01
    }
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 260, 25 );

  banana();
  rock();
}



function banana(){
  if (World.frameCount % 90 === 0) {
    var banana = createSprite(600,50,40,10);
    banana.y = Math.round(random(30,100));
    banana.addImage(bananaImage);
    banana.scale = 0.03;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);   
   }
  }

function rock() {
  if(World.frameCount % 60 === 0) {
    var rock = createSprite(600,170,10,40);
    
    rock.addImage(rockImage);   
    
    rock.velocityX = - (6);
    
    rock.scale = 0.1;
    
    rock.lifetime = 100;
    
    rockGroup.add(rock);
  }
}
