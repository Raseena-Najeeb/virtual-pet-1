var dog;
var foodstock;
var foodS;
var database;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  dogHappyImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);


  database = firebase.database();

  dog = createSprite(250,400,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodstock = database.ref("Food");
  foodstock.on("value", readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(dogHappyImg);
  }
  drawSprites();


  fill("white");
  text("Note: Press UP_Key to Feed Drago Milk!" , 150,20);
  textSize(18);
  text("Food Remaining: " + foodS,170,300);
}


function readStock(data)
{
  foodS = data.val();
  console.log(foodS);
}

function writeStock(x)
{

  if(x<= 0)
  {
    x = 0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food : x
  })
}


