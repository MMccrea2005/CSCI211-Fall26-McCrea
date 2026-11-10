// Exercise 2: Theme Switcher (SOLUTION)
const themeButtons = document.querySelectorAll(".theme-btn");
const THEMES = ["light", "dark", "ocean"];

// One shared handler for all three buttons
function applyTheme(e) {
  // currentTarget is the button the listener is attached to.
  // (target would also work here, but currentTarget is safer if
  // someone later puts an icon or <span> inside the button.)
  const theme = e.currentTarget.dataset.theme;

  // Remove every theme class, then add the chosen one
  THEMES.forEach(function (t) {
    document.body.classList.remove("theme-" + t);
  });
  document.body.classList.add("theme-" + theme);
}

// addEventListener belongs to each element, not the NodeList, so loop
themeButtons.forEach(function (button) {
  button.addEventListener("click", applyTheme);
});
