// Events Lab - automated behavior checks (runs pages in a simulated browser)
//
// Setup (once):   npm install jsdom
// Run:            node check_lab.js <folder>
//   <folder> holds the six exercise folders (ex1-click-counter, ...).
//   With no folder given, it checks ../solutions.
//
// Notes for grading student work:
//   - ex4 compares exact log text, so a student's wording may "fail" while
//     the ORDER is correct. Review ex4 by hand if it fails.
//   - ex6 expects id="clearDone", class="edit" on the edit box, and the F2
//     shortcut used in the reference solution. Students may pick a different
//     shortcut key; check feature 3 by hand in that case.
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const SOL = path.resolve(process.argv[2] || path.join(__dirname, "..", "solutions"));

function load(folder) {
  const html = fs.readFileSync(path.join(SOL, folder, "index.html"), "utf8")
    .replace(/<script[^>]*><\/script>/, "");
  const dom = new JSDOM(html, { runScripts: "outside-only" });
  const logs = [];
  dom.window.console.log = (...a) => logs.push(a.join(" "));
  dom.window.eval(fs.readFileSync(path.join(SOL, folder, "app.js"), "utf8"));
  return { w: dom.window, d: dom.window.document, logs };
}
const key = (w, target, k, opts = {}) => {
  const ev = new w.KeyboardEvent("keydown", { key: k, bubbles: true, cancelable: true, ...opts });
  target.dispatchEvent(ev);
  return ev;
};
let passed = 0;
function check(name, fn) {
  try {
    fn(); passed++; console.log("PASS", name);
  } catch (err) {
    console.log("FAIL", name, "->", err.message.split("\n")[0]);
  }
}

check("ex1 counter", () => {
  const { d } = load("ex1-click-counter");
  const btn = d.querySelector("#clickBtn"), msg = d.querySelector("#countMsg");
  btn.click(); assert.equal(msg.textContent, "Clicks: 1");
  for (let i = 0; i < 8; i++) btn.click();
  assert.equal(msg.textContent, "Clicks: 9"); assert.equal(btn.disabled, false); assert.equal(msg.style.color, "");
  btn.click();
  assert.equal(msg.textContent, "Clicks: 10"); assert.equal(msg.style.color, "red"); assert.equal(btn.disabled, true);
  btn.click(); assert.equal(msg.textContent, "Clicks: 10");
});

check("ex2 themes", () => {
  const { d } = load("ex2-theme-switcher");
  const b = d.querySelectorAll(".theme-btn");
  b[1].click(); assert.equal(d.body.className, "theme-dark");
  b[2].click(); assert.equal(d.body.className, "theme-ocean");
  b[2].click(); assert.equal(d.body.className, "theme-ocean");
  b[0].click(); assert.equal(d.body.className, "theme-light");
});

check("ex3 counter", () => {
  const { w, d } = load("ex3-char-counter");
  const t = d.querySelector("#postText"), r = d.querySelector("#remaining"), p = d.querySelector("#postBtn");
  const type = (n) => { t.value = "a".repeat(n); t.dispatchEvent(new w.Event("input", { bubbles: true })); };
  assert.equal(r.textContent, "140 characters remaining");
  type(5);   assert.equal(r.textContent, "135 characters remaining"); assert.equal(r.className, "");
  type(120); assert.equal(r.textContent, "20 characters remaining"); assert.equal(r.className, "");
  type(121); assert.equal(r.textContent, "19 characters remaining"); assert.equal(r.className, "warning");
  type(140); assert.equal(r.textContent, "0 characters remaining"); assert.equal(r.className, "warning"); assert.equal(p.disabled, false);
  type(141); assert.equal(r.textContent, "-1 characters remaining"); assert.equal(r.className, "over"); assert.equal(p.disabled, true);
  type(10);  assert.equal(r.className, ""); assert.equal(p.disabled, false);
});

check("ex4 propagation", () => {
  const { d, logs } = load("ex4-propagation");
  d.querySelector("#inner").click();
  assert.deepEqual(logs, [
    "outer listener | target: inner | currentTarget: outer",
    "inner listener | target: inner | currentTarget: inner",
    "middle listener | target: inner | currentTarget: middle"]);
  assert.equal(d.querySelectorAll("#log li").length, 3);
  logs.length = 0; d.querySelector("#outer").click();
  assert.deepEqual(logs, ["outer listener | target: outer | currentTarget: outer"]);
});

check("ex5 drawing pad", () => {
  const { w, d } = load("ex5-drawing-pad");
  const c = d.querySelector("#cursor"), dots = () => d.querySelectorAll(".dot").length;
  let ev = key(w, d.body, "ArrowRight");
  assert.equal(c.style.left, "10px"); assert.equal(ev.defaultPrevented, true); assert.equal(dots(), 1);
  key(w, d.body, "ArrowDown", { shiftKey: true }); assert.equal(c.style.top, "30px"); assert.equal(dots(), 2);
  key(w, d.body, "ArrowUp", { shiftKey: true }); assert.equal(c.style.top, "0px");
  const before = dots(); key(w, d.body, "ArrowUp"); assert.equal(c.style.top, "0px"); assert.equal(dots(), before, "no dot at edge");
  for (let i = 0; i < 20; i++) key(w, d.body, "ArrowRight", { shiftKey: true });
  assert.equal(c.style.left, "380px");
  ev = key(w, d.body, "x"); assert.equal(ev.defaultPrevented, false);
  key(w, d.body, "C", { shiftKey: true }); assert.equal(dots(), 0);
});

check("ex6 todo", () => {
  const { w, d } = load("ex6-todo-extended");
  const inp = d.querySelector("#taskInput"), form = d.querySelector("#taskForm"), st = d.querySelector("#status");
  const add = (t) => { inp.value = t; form.dispatchEvent(new w.Event("submit", { cancelable: true })); };
  add("Wash car"); add("Read ch. 7"); add("Email advisor");
  const spans = () => [...d.querySelectorAll("#taskList li span")].map((s) => s.textContent);
  assert.equal(st.textContent, "3 tasks remaining");
  // toggle + clear completed
  d.querySelectorAll("#taskList li span")[0].click();
  assert.equal(st.textContent, "2 tasks remaining");
  d.querySelector("#clearDone").click();
  assert.deepEqual(spans(), ["Read ch. 7", "Email advisor"]);
  // double-click sequence: click, click, dblclick -> state unchanged, edit box appears
  const label = d.querySelectorAll("#taskList li span")[0];
  const li = label.parentElement;
  label.dispatchEvent(new w.MouseEvent("click", { bubbles: true, detail: 1 }));
  label.dispatchEvent(new w.MouseEvent("click", { bubbles: true, detail: 2 }));
  label.dispatchEvent(new w.MouseEvent("dblclick", { bubbles: true, detail: 2 }));
  assert.equal(li.classList.contains("done"), false);
  const box = li.querySelector("input.edit");
  assert.ok(box); assert.equal(box.value, "Read ch. 7");
  box.click(); assert.equal(li.classList.contains("done"), false, "click in edit box must not toggle");
  // Escape in edit box cancels and must NOT clear the new-task input
  inp.value = "half typed";
  key(w, box, "Escape");
  assert.equal(inp.value, "half typed"); assert.ok(li.querySelector("span")); assert.equal(li.querySelector("input"), null);
  assert.deepEqual(spans(), ["Read ch. 7", "Email advisor"]);
  // Edit and save with Enter; "/" typed in edit box stays put
  li.querySelector("span").dispatchEvent(new w.MouseEvent("dblclick", { bubbles: true }));
  const box2 = li.querySelector("input.edit");
  const slash = key(w, box2, "/"); assert.equal(slash.defaultPrevented, false);
  box2.value = "Read ch. 7 & 8"; key(w, box2, "Enter");
  assert.deepEqual(spans(), ["Read ch. 7 & 8", "Email advisor"]);
  // Empty edit keeps old text
  li.querySelector("span").dispatchEvent(new w.MouseEvent("dblclick", { bubbles: true }));
  li.querySelector("input.edit").value = "   "; key(w, li.querySelector("input.edit"), "Enter");
  assert.equal(spans()[0], "Read ch. 7 & 8");
  // F2 marks all done
  key(w, d.body, "F2");
  assert.equal(st.textContent, "0 tasks remaining");
  // Typing letters in the new-task box is unaffected
  assert.equal(key(w, inp, "d").defaultPrevented, false);
  // HTML stays literal
  add("<b>bold?</b>"); assert.equal(d.querySelectorAll("#taskList b").length, 0);
});

console.log(`\n${passed} of 6 checks passed`);
