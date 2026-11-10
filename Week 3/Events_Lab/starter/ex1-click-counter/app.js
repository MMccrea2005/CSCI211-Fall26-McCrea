// Exercise 1: Click Counter
// Your name: Michael McCrea
//
// TODO list:
//   1. Select the button (#clickBtn) and the paragraph (#countMsg).
//   2. Create a variable to hold the click count.
//   3. Add a click listener that increases the count and updates the paragraph. (Section 2.1)
//   4. At 10 clicks, turn the paragraph red with an inline style and disable the button.

const clickBtn = document.querySelector("#clickBtn");
const countMsg = document.querySelector("#countMsg");

const LIMIT = 10
let clicks = 0

function handleClick(){
    clicks++
    countMsg.textContent = `Clicks: ${clicks}`

    if (clicks >= LIMIT){
        countMsg.style.color = "red"
        clickBtn.disabled = true
    }
}

clickBtn.addEventListener("click", handleClick)