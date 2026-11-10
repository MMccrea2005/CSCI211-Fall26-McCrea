// Exercise 4: Propagation Explorer (SOLUTION, final state after step 3)
const outer = document.querySelector("#outer");
const middle = document.querySelector("#middle");
const inner = document.querySelector("#inner");
const log = document.querySelector("#log");

// Logs to the console AND to the page, so the order is easy to see
function report(e) {
  const message = `${e.currentTarget.id} listener | target: ${e.target.id}` +
                  ` | currentTarget: ${e.currentTarget.id}`;
  console.log(message);

  const item = document.createElement("li");
  item.textContent = message;
  log.append(item);
}

// Step 2: the outer listener runs in the CAPTURE phase
outer.addEventListener("click", report, { capture: true });

// Step 3: the middle listener stops the event from going any further
middle.addEventListener("click", function (e) {
  report(e);
  e.stopPropagation();
});

inner.addEventListener("click", report);

document.querySelector("#clearLog").addEventListener("click", function () {
  log.innerHTML = "";
});
