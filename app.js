let fly = document.querySelector(".stars");
let image = document.querySelector(".bg-image-blur");
let first = document.querySelector(".first");
let second = document.querySelector(".second");
let last = document.querySelector(".last");
let number = document.querySelector(".number");
let winner = Math.floor(Math.random() * 700);

function nextDiv() {
  console.log(second);
  second.style.display='block';
  first.style.display='none';
  setTimeout(fadeAway, 3100);
  setTimeout(theNumber, 4000);
  image.classList.add("bg-blur");
}

function theNumber(){
  console.log(winner);
  second.style.display='none';
  last.style.display='flex';
  number.innerHTML=winner;
  setTimeout(stars, 500);
}

function fadeAway(){
  second.classList.add("disappear");
}

function stars() {
  fly.classList.add("stars-show");
}

