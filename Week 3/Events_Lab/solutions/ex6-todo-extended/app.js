// Exercise 6: Extended To-Do List (SOLUTION)
const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const statusMsg = document.querySelector("#status");
const clearDoneBtn = document.querySelector("#clearDone");

function updateStatus() {
  const remaining = taskList.querySelectorAll("li:not(.done)").length;
  statusMsg.textContent = `${remaining} task${remaining === 1 ? "" : "s"} remaining`;
}

function addTask(text) {
  const li = document.createElement("li");

  const label = document.createElement("span");
  label.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "×";
  deleteBtn.className = "delete";
  deleteBtn.type = "button";

  li.append(label, deleteBtn);
  taskList.append(li);
  updateStatus();
}

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text === "") {
    return;
  }
  addTask(text);
  taskInput.value = "";
  taskInput.focus();
});

// Toggling and deleting (delegated)
taskList.addEventListener("click", function (e) {
  // NEW: clicks inside an edit box should not toggle the task
  if (e.target.classList.contains("edit")) {
    return;
  }

  const li = e.target.closest("li");
  if (!li) {
    return;
  }

  if (e.target.classList.contains("delete")) {
    li.remove();
  } else {
    li.classList.toggle("done");
  }
  updateStatus();
});

// ---------- Feature 1: Clear completed ----------
clearDoneBtn.addEventListener("click", function () {
  taskList.querySelectorAll("li.done").forEach((li) => li.remove());
  updateStatus();
});

// ---------- Feature 2: Double-click to edit ----------
// A double-click also produces two "click" events first. The first one
// toggles the task and the second toggles it back, so by the time
// "dblclick" fires, the task is in its original state. No extra code needed.
taskList.addEventListener("dblclick", function (e) {
  const label = e.target.closest("span");
  if (!label) {
    return;                          // double-clicked the × or empty space
  }
  startEditing(label);
});

function startEditing(label) {
  const box = document.createElement("input");
  box.type = "text";
  box.className = "edit";
  box.value = label.textContent;

  label.replaceWith(box);            // swap the text for the text box
  box.focus();
  box.select();

  box.addEventListener("keydown", function (e) {
    // Keep these keys away from the page-wide shortcut handler.
    // Without this, Escape here would ALSO clear the new-task box,
    // and typing "/" would jump focus to the new-task box.
    e.stopPropagation();

    if (e.key === "Enter") {
      const newText = box.value.trim();
      if (newText !== "") {
        label.textContent = newText; // textContent: still user input!
      }
      box.replaceWith(label);
    } else if (e.key === "Escape") {
      box.replaceWith(label);        // cancel: put the old label back
    }
  });
}

// ---------- Keyboard shortcuts ----------
const shortcuts = {
  Escape: () => { taskInput.value = ""; },
  "/":    () => { taskInput.focus(); },
  // Feature 3: F2 marks every task done. A function key is used because a
  // letter key would fire while the user is typing a new task.
  F2:     () => {
    taskList.querySelectorAll("li").forEach((li) => li.classList.add("done"));
    updateStatus();
  }
};

document.addEventListener("keydown", function (e) {
  const action = shortcuts[e.key];
  if (!action) {
    return;
  }
  if (e.key === "/" && e.target === taskInput) {
    return;
  }
  e.preventDefault();
  action();
});
