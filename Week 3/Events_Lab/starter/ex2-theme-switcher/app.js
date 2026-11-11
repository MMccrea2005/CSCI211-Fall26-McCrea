// Exercise 2: Theme Switcher
// Your name:
//
// TODO list:
//   1. Select ALL the .theme-btn buttons with querySelectorAll(). (Section 2.2.3)
//   2. Write ONE handler function that reads the button's data-theme value.
//   3. In the handler, remove all theme classes from <body>, then add the chosen one.
//   4. Loop over the buttons and attach the same handler to each.
const themeButtons = document.querySelectorAll(".theme-btn");
const THEMES = ["light", "dark", "ocean"];

function applyTheme(e) {
    const theme = e.currentTarget.dataset.theme;

    console.log(`Change to ${e.currentTarget.dataset.theme}`);

    THEMES.forEach(function (t) {
        document.body.classList.remove("theme-" + t);
    });
    document.body.classList.add("theme-" + theme);
}

themeButtons.forEach(function (button) {
    button.addEventListener("click", applyTheme);
})