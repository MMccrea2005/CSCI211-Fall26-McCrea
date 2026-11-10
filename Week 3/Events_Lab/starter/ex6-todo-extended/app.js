// Exercise 6: Extend the To-Do App
// Your name:
//
// This is the to-do app from Section 4 of the chapter. Add:
//   1. A "Clear completed" button
//   2. Double-click a task to edit it (Enter saves, Escape cancels)
//   3. A keyboard shortcut that marks all tasks done (add it to the shortcuts object only)

const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const statusMsg = document.querySelector("#status");

// Update the "tasks remaining" message
function updateStatus() {
  const remaining = taskList.querySelectorAll("li:not(.done)").length;
  statusMsg.textContent = `${remaining} task${remaining === 1 ? "" : "s"} remaining`;
}

// Build one <li> and add it to the list
function addTask(text) {
  const li = document.createElement("li");

  const label = document.createElement("span");
  label.textContent = text;          // textContent, not innerHTML: user input!

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "×";
  deleteBtn.className = "delete";
  deleteBtn.type = "button";

  li.append(label, deleteBtn);
  taskList.append(li);
  updateStatus();
}

// Adding: the submit event covers both the button and the Enter key
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();                // stay on this page
  const text = taskInput.value.trim();
  if (text === "") {
    return;                          // ignore empty tasks
  }
  addTask(text);
  taskInput.value = "";
  taskInput.focus();
});

// Toggling and deleting: ONE delegated listener on the <ul>
taskList.addEventListener("click", function (e) {
  const li = e.target.closest("li");
  if (!li) {
    return;                          // click wasn't on a task
  }

  if (e.target.classList.contains("delete")) {
    li.remove();
  } else {
    li.classList.toggle("done");
  }
  updateStatus();
});

// Keyboard shortcuts stored as functions in an object
const shortcuts = {
  Escape: () => { taskInput.value = ""; },
  "/":    () => { taskInput.focus(); }
};

document.addEventListener("keydown", function (e) {
  const action = shortcuts[e.key];
  if (!action) {
    return;
  }
  // Don't hijack "/" while the user is typing in the box
  if (e.key === "/" && e.target === taskInput) {
    return;
  }
  e.preventDefault();
  action();
});
