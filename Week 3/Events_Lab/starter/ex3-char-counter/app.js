// Exercise 3: Live Character Counter
// Your name:
//
// TODO list:
//   1. Select the textarea, the #remaining paragraph, and the Post button.
//   2. Write a function that calculates characters left (140 minus the length).
//   3. Update the message, and add/remove the warning and over-limit classes.
//   4. Disable the Post button when the count goes below zero.
//   5. Run the function on every 'input' event AND once when the page loads. (Table 1, Section 2)
const postText = document.querySelector("#postText");
const remaining = document.querySelector("#remaining");
const postBtn = document.querySelector("#postBtn");

const MAX_CHARACTERS = 140;
const WARNING_AT = 20;

function updateCounter() {
    const left = MAX_CHARACTERS - postText.value.length;
    remaining.textContent = `${left} characters remaining`;

    remaining.classList.toggle("warning", left < WARNING_AT && left >=0);
    remaining.classList.toggle("over", left < 0);
    postBtn.disabled = left < 0;
}

postText.addEventListener("input", updateCounter);

// run update once on page load to ensure state
document.addEventListener("load",updateCounter);