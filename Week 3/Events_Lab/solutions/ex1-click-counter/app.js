// Exercise 1: Click Counter (SOLUTION)
const clickBtn = document.querySelector("#clickBtn");
const countMsg = document.querySelector("#countMsg");

const LIMIT = 10;
let clicks = 0;

function handleClick() {
  clicks++;
  countMsg.textContent = `Clicks: ${clicks}`;

  if (clicks >= LIMIT) {
    countMsg.style.color = "red";   // inline style, as the exercise asks
    clickBtn.disabled = true;       // a disabled button fires no click events
  }
}

clickBtn.addEventListener("click", handleClick);
