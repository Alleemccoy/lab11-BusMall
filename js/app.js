'use strict';

let allProducts = [];

function Product(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.numberOfViews = 0;
  this.numberOfClicks = 0;
  allProducts.push(this);
}

new Product('bag', 'bag.jpg');
new Product('banana', 'banana.jpg');
new Product('bathroom', 'bathroom.jpg');
new Product('boots', 'boots.jpg');
new Product('breakfast', 'breakfast.jpg');
new Product('bubblegum', 'bubblegum.jpg');
new Product('chair', 'chair.jpg');
new Product('cthulhu', 'cthulhu.jpg');
new Product('dog-duck', 'dog-duck.jpg');
new Product('dragon', 'dragon.jpg');
new Product('pen', 'pen.jpg');
new Product('pet-sweep', 'pet-sweep.jpg');
new Product('scissors', 'scissors.jpg');
new Product('shark', 'shark.jpg');
new Product('sweep', 'sweep.png');
new Product('tauntaun', 'tauntaun.jpg');
new Product('unicorn', 'unicorn.jpg');
new Product('usb', 'usb.gif');
new Product('water-can', 'water-can.jpg');
new Product('wine-glass', 'wine-glass.jpg');

function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  let firstProductIndex = getRandomIndex();
  let secondProductIndex = getRandomIndex();
  let thirdProductIndex = getRandomIndex();

  // firstProductIndex = 1;
  // secondProductIndex = 1;
  // thirdProductIndex = 1;

  // console.log(firstProductIndex);
  // console.log(secondProductIndex);
  // console.log(thirdProductIndex);

  while (firstProductIndex === secondProductIndex) {
    // console.log('inside while loop');
    secondProductIndex = getRandomIndex();
  }

  while (firstProductIndex === thirdProductIndex) {
    // console.log('inside while loop');
    thirdProductIndex = getRandomIndex();
  }

  while (secondProductIndex === thirdProductIndex) {
    // console.log('inside while loop');
    thirdProductIndex = getRandomIndex();
  }

  // console.log(firstProductIndex);
  // console.log(secondProductIndex);
  // console.log(thirdProductIndex);
}

