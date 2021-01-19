var dog, dogImage, happyDogImage;
var database, foodS, food, stockInDatabase;

function preload() {
  dogImage = loadAnimation("Dog.png");
  happyDogImage = loadAnimation("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250, 350);
  dog.addAnimation("hungryDog", dogImage);
  dog.addAnimation("happyDog", happyDogImage);
  dog.scale = 0.4;

  database = firebase.database();
  var foodStock = database.ref('Food');
  foodStock.on("value", readFoodStock, showError);
  //console.log(foodStock);
}

function draw() {
  background(46, 139, 87);

  //console.log(foodS);
  
  if(keyDown(UP_ARROW) && stockInDatabase > 0) {
    writeFoodStock(stockInDatabase);
    dog.changeAnimation("happyDog", happyDogImage);
  }

  //console.log(stockInDatabase);

  fill("white");
  textSize(20);
  text("Press the up arrow to feed the dog!", 125, 30);
  text("Food remaining: " + stockInDatabase, 150, 150);

  drawSprites();
}

function readFoodStock(data) {
  stockInDatabase = data.val();
 // foodS = stockInDatabase;
  console.log("Good");
}

function writeFoodStock(food) {
  console.log(food);
  database.ref('/').update({
     Food: food -= 1
  });
}

function showError() {
  console.log("Error in writing to database");
}