//Create variables here
var dog, happyDog;
var database; 
var foodS, foodStock;
var feed,addFood;
var fedTime, lastFed;
var foodObj;


function preload(){
//load images here
  dog=loadImage("Dog.png");
  happyDog=loadImage("happydog.png");

}

function setup() {
  createCanvas(900, 500);

  database = firebase.database();

  dog = createSprite(250,250,10,10);
  dog = addImage(dog);
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  foodObj = new Food();

  feed = createButton("FEED THE DOG");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  
}


function draw() {  
  background(46,139,87);

  Text("NOTE:Press UP_ARROW To Feed Drago Milk",100,50);

  foodObj.display();
  feed.display();
  addFood.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });


  drawSprites();
  //add styles here
  textsize(15);
  Fill (255,255,255);
  stroke ("green");

  if(lastFed>12){
    text("LAST FEED : "+lastFed%12+"PM",350,30);
  }else if(lastFed==0){
    text("LAST FEED : 12 AM",350,30);
  }else{
    text("LAST FEED : "+ lastFed+"AM",350,30);
  }

}

function  readStock(data){
  foodS=data.val
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}
function feedDog(){
  dog . addImage(happyDog);

  foodObj.getFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour ()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


