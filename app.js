
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
}

function theNumber(){
  console.log(winner);
  second.style.display='none';
  last.style.display='block';
  number.innerHTML=winner;
}

function fadeAway(){
  second.classList.add("disappear");
}
