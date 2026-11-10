// Exercise 4: Propagation Explorer
// Your name:
//
// TODO list:
//   1. Select #outer, #middle, #inner, and #log.
//   2. Write ONE function that logs the listener's id, e.target.id, and e.currentTarget.id.
//   3.   (Also pass the message to the addToLog() helper below so it shows on the page.)
//   4. Attach it as a click listener to all three boxes and do step 1.
//   5. Then make the changes for steps 2 and 3, recording what you see after each. (Section 2.3.3)

const log = document.querySelector("#log");

// Helper: call addToLog(message) to show a message on the page
function addToLog(message) {
  const item = document.createElement("li");
  item.textContent = message;
  log.append(item);
}

document.querySelector("#clearLog").addEventListener("click", function () {
  log.innerHTML = "";
});
