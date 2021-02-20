'use strict';

let allProducts = [];
let previousImages = [];
let productOne = document.querySelector('section img:first-child');
let productTwo = document.querySelector('section img:nth-child(2)');
let productThree = document.querySelector('section img:nth-child(3)');
let section = document.querySelector('section');
let buttonResults = document.getElementById('viewResults');
let timesClicked = 0;
let allowedClicks = 25;
let uniqueImageCount = 3;

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `images/${name}.${fileExtension}`;
  this.numberOfViews = 0;
  this.numberOfClicks = 0;
  allProducts.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('usb', 'gif');
new Product('water-can');
new Product('wine-glass');

function getRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}


function renderProducts() {
  let indexArray = [];
  while (indexArray.length < uniqueImageCount) {
    let randomIndex = getRandomProduct();
    if (!previousImages.includes(randomIndex)) {
      while (!indexArray.includes(randomIndex)) {
        console.log('hit');
        indexArray.push(randomIndex);
      }

    }
  }


  previousImages[0] = indexArray[0];
  previousImages[1] = indexArray[1];
  previousImages[2] = indexArray[2];

  productOne.src = allProducts[indexArray[0]].src;
  productOne.title = allProducts[indexArray[0]].name;
  allProducts[indexArray[0]].numberOfViews++;

  productTwo.src = allProducts[indexArray[1]].src;
  productTwo.title = allProducts[indexArray[1]].name;
  allProducts[indexArray[1]].numberOfViews++;

  productThree.src = allProducts[indexArray[2]].src;
  productThree.title = allProducts[indexArray[2]].name;
  allProducts[indexArray[2]].numberOfViews++;

}

// create render function

function renderVoteResults() {
  let clicks = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} received ${allProducts[i].numberOfClicks} clicks, and was seen ${allProducts[i].numberOfViews} times`;
    clicks.appendChild(li);
  }
}

function clickOnPage(event) {
  if (event.target === section) {
    alert('Please click on an image');
  }
  timesClicked++;
  let clickItem = event.target.title;
  for (let i = 0; i < allProducts.length; i++) {
    if (clickItem === allProducts[i].name) {
      allProducts[i].numberOfClicks++;
    }
  }
  renderProducts();
  if (timesClicked === allowedClicks) {
    section.removeEventListener('click', clickOnPage);
  }
}
function clickButton(event) {
  if (timesClicked === allowedClicks) {
    renderVoteResults();
  }
}
renderProducts();

section.addEventListener('click', clickOnPage);
buttonResults.addEventListener('click', renderVoteResults);
