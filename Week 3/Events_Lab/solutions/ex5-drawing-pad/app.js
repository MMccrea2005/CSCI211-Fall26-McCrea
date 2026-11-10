// Exercise 5: Keyboard-Controlled Drawing Pad (SOLUTION)
const pad = document.querySelector("#pad");
const cursor = document.querySelector("#cursor");

const PAD_SIZE = 400;
const CURSOR_SIZE = 20;
const MAX_POS = PAD_SIZE - CURSOR_SIZE;   // 380: furthest the cursor can go
const STEP = 10;
const FAST_STEP = 30;

let x = 0;
let y = 0;

// Lookup table: each arrow key maps to a function that changes x or y
const moves = {
  ArrowUp:    (d) => { y -= d; },
  ArrowDown:  (d) => { y += d; },
  ArrowLeft:  (d) => { x -= d; },
  ArrowRight: (d) => { x += d; }
};

// Keep a value between min and max
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function drawCursor() {
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
}

function dropDot(atX, atY) {
  const dot = document.createElement("div");
  dot.className = "dot";
  dot.style.left = atX + "px";
  dot.style.top = atY + "px";
  pad.append(dot);
}

function clearDots() {
  pad.querySelectorAll(".dot").forEach((dot) => dot.remove());
}

document.addEventListener("keydown", function (e) {
  if (e.key.toLowerCase() === "c") {
    clearDots();
    return;
  }

  const move = moves[e.key];
  if (!move) {
    return;                       // not a key we handle; leave it alone
  }

  e.preventDefault();             // arrow keys would otherwise scroll

  const oldX = x;
  const oldY = y;

  move(e.shiftKey ? FAST_STEP : STEP);
  x = clamp(x, 0, MAX_POS);
  y = clamp(y, 0, MAX_POS);

  // Only leave a trail if the cursor actually moved (not stuck at an edge)
  if (x !== oldX || y !== oldY) {
    dropDot(oldX, oldY);
    drawCursor();
  }
});

drawCursor();
