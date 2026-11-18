// Exercise 6: Extend the Hike Log
// Your name:
//
// TODO list (chapter sections in brackets):
//   1. Add <button id="sortMiles">Sort by miles</button> to the HTML.
//   2.    Clicking it puts the longest hike first. Sort the hikes ARRAY, then render().
//   3. Add a button.star to each hike. Clicking it toggles that hike's
//   4.    favorite setting IN THE DATA, then render().
//   5. Add <select id="filterLevel"> with values all, easy, moderate, hard.
//   6.    render() shows only matching hikes, and the summary describes
//   7.    only those hikes ("No hikes match this filter." if none match).
//   8. Remove and the star must change the right hike while a filter is on.

// ---- The Hike Log from Section 6 of the chapter starts here ----
// ----- 1. Elements -----
const form = document.querySelector("#hikeForm");
const trailInput = document.querySelector("#trail");
const milesInput = document.querySelector("#miles");
const difficultySelect = document.querySelector("#difficulty");
const favoriteBox = document.querySelector("#favorite");
const hikeList = document.querySelector("#hikeList");
const summary = document.querySelector("#summary");

// ----- 2. Data: the array is the source of truth -----
const hikes = [];

// ----- 3. Functions -----
function showError(field, message) {
  // the <p class="error">
  const errorBox = field.nextElementSibling;
  errorBox.textContent = message;
  field.classList.toggle("invalid", message !== "");
}

function validate() {
  const trailError = trailInput.value.trim() === ""
    ? "Enter a trail name."
    : "";
  const miles = Number(milesInput.value);
  const milesError = milesInput.value.trim() === "" || !(miles > 0)
    ? "Miles must be a number greater than 0."
    : "";

  showError(trailInput, trailError);
  showError(milesInput, milesError);
  return trailError === "" && milesError === "";
}

function createHikeItem(hike, index) {
  const li = document.createElement("li");
  li.classList.add("hike", hike.difficulty);
  li.classList.toggle("favorite", hike.favorite);
  // which array item this is
  li.dataset.index = index;

  const name = document.createElement("span");
  name.className = "name";
  // user input: textContent only
  name.textContent = hike.trail;

  const details = document.createElement("span");
  details.textContent = `${hike.miles} mi, ${hike.difficulty}`;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "remove";
  removeBtn.textContent = "Remove";

  li.append(name, details, removeBtn);
  return li;
}

function render() {
  const fragment = document.createDocumentFragment();
  hikes.forEach((hike, i) => {
    fragment.appendChild(createHikeItem(hike, i));
  });
  hikeList.replaceChildren(fragment);       // one update to the page

  let total = 0;
  for (const hike of hikes) {
    total += hike.miles;
  }
  summary.textContent = hikes.length === 0
    ? "No hikes logged yet."
    : `${hikes.length} hike(s), ${total.toFixed(1)} miles total`;
}

// ----- 4. Event listeners -----
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validate()) {
    return;
  }
  hikes.push({
    trail: trailInput.value.trim(),
    // a string until converted!
    miles: Number(milesInput.value),
    difficulty: difficultySelect.value,
    favorite: favoriteBox.checked
  });
  form.reset();                             // clear every field
  trailInput.focus();
  render();
});

// One listener on the list handles every Remove button
hikeList.addEventListener("click", function (e) {
  if (!e.target.classList.contains("remove")) {
    // the click wasn't on a Remove button
    return;
  }
  const li = e.target.parentElement;
  hikes.splice(Number(li.dataset.index), 1);
  render();
});

// Clear a field's error as soon as the user starts fixing it
for (const field of [trailInput, milesInput]) {
  field.addEventListener("input", () => showError(field, ""));
}

// ----- 5. Startup -----
render();
