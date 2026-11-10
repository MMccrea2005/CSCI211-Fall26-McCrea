// Exercise 3: Live Character Counter (SOLUTION)
const postText = document.querySelector("#postText");
const remaining = document.querySelector("#remaining");
const postBtn = document.querySelector("#postBtn");

const MAX_CHARS = 140;
const WARNING_AT = 20;

function updateCounter() {
  const left = MAX_CHARS - postText.value.length;

  remaining.textContent = `${left} characters remaining`;

  // classList.toggle with a second argument: add if true, remove if false
  remaining.classList.toggle("warning", left < WARNING_AT && left >= 0);
  remaining.classList.toggle("over", left < 0);

  postBtn.disabled = left < 0;
}

// "input" fires on every change: typing, deleting, pasting, cutting
postText.addEventListener("input", updateCounter);

// Run once at load so the page starts in the correct state
updateCounter();
