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
// defining what this is referring to
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `images/${name}.${fileExtension}`;
  this.numberOfViews = 0;
  this.numberOfClicks = 0;
  allProducts.push(this);
}

// local storage
let retrievedProducts = localStorage.getItem('products');
console.log(retrievedProducts);

if (retrievedProducts) {
  let parsedProducts = JSON.parse(retrievedProducts);
  console.log(parsedProducts);

  allProducts = parsedProducts;
} else {
  // creating new products and naming them
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
}
// random image generator
function getRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

// this is ensuring that the 3 images shown are not matching any of the previous 3 images that were just shown
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
  // creating 3 places for images
  previousImages[0] = indexArray[0];
  previousImages[1] = indexArray[1];
  previousImages[2] = indexArray[2];
  // updating the images with the right source and name and updating the view counts
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

// here is where I display all the vote totals for each product
function renderVoteResults() {
  let clicks = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} received ${allProducts[i].numberOfClicks} clicks, and was seen ${allProducts[i].numberOfViews} times`;
    clicks.appendChild(li);
  }
}

function clickOnPage(event) {
  // created alert that is activated when user clicks on something other than one of the photos
  if (event.target === section) {
    alert('Please click on an image');
    return;
  }
  // total number of clicks on any photo
  timesClicked++;
  let clickItem = event.target.title;
  for (let i = 0; i < allProducts.length; i++) {
    if (clickItem === allProducts[i].name) {
      allProducts[i].numberOfClicks++;
    }
  }
  renderProducts();
  // Once total number of clicks is 25 stop new pictures from populating and show bar chart
  if (timesClicked === allowedClicks) {
    section.removeEventListener('click', clickOnPage);
    buttonResults.addEventListener('click', renderVoteResults);
    let stringifiedProducts = JSON.stringify(allProducts);
    localStorage.setItem('products', stringifiedProducts);
    renderChart();
  }
}

// creating the bar chart here
function renderChart() {
  let productNames = [];
  let productViews = [];
  let productClicks = [];
  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].numberOfViews);
    productClicks.push(allProducts[i].numberOfClicks);
  }
  console.log('productNames: ', productNames);
  console.log('productViews', productViews);
  console.log('productClicks', productClicks);
  var chartObject = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Views',
        data: productViews,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 3
      },
      {
        label: 'Clicks',
        data: productClicks,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 3
      }]
    },
    responsive: false,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  let ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, chartObject);
}

renderProducts();

section.addEventListener('click', clickOnPage);
