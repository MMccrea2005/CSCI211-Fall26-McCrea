// Exercise 1: Trail Cards
// Your name: Michael McCrea
//
// TODO list (chapter sections in brackets):
//   1. Select #cards, #featured and #totalMiles once, at the top.
//   2. Write createTrailCard(trail): a div with classes "card" and the
//      trail's level, holding an <h3> with the name and a <p>
//      like "5.1 miles, moderate". Use textContent. [2.1.1, 2.1.2]
//   3. Collect all five cards in a DocumentFragment, then attach it to
//      #cards in ONE step. [5.1.1]
//   4. Show the LONGEST trail (found from the data) in #featured, as its
//      own NEW card. All five cards must stay in #cards. [2.1.2]
//   5. Show "Total: 25.9 miles" in #totalMiles, added up from the array
//      (not read back from the page), with one decimal place.

// The trail data is ready for you:
const trails = [
  { name: "Bear Creek Loop", miles: 2.4, level: "easy" },
  { name: "Pine Ridge Trail", miles: 5.1, level: "moderate" },
  { name: "Summit Lake Trail", miles: 8.7, level: "hard" },
  { name: "Cedar Falls Trail", miles: 3.2, level: "easy" },
  { name: "Elk Meadow Trail", miles: 6.5, level: "moderate" }
];

const cardsBox = document.querySelector("#cards");
const featuredBox = document.querySelector("#featured");
const totalMiles = document.querySelector("#totalMiles");

function createTrailCard(trail){
  const card = document.createElement("div");
  card.classList.add("card", trail.level)

  const heading = document.createElement("h3")
  heading.textContent = trail.name;

  const info = document.createElement("p");
  info.textContent = `${trail.miles}, ${trail.level}`

  card.append(heading, info);
  return card;
}


// build every card "off page" and attach once to DOM

const fragment = document.createDocumentFragment();
let total = 0;
let longest = trails[0]; // this is object

for(const trail of trails){
  fragment.appendChild(createTrailCard(trail));
  total += trail.miles;
  if(trail.miles > longest.miles){
    longest = trail;
  }
}

cardsBox.appendChild(fragment);
featuredBox.appendChild(createTrailCard(longest));
totalMiles.textContent = `Total: ${total.toFixed(1)} miles`;