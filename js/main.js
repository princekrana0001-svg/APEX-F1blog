/* ==================================================
   APEX - MAIN JAVASCRIPT
================================================== */


/* ==================================================
   MOBILE MENU
================================================== */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

if (menuButton && navMenu) {

    menuButton.addEventListener("click", function () {

        navMenu.classList.toggle("show");

    });

}


/* ==================================================
   DARK MODE
================================================== */

const themeToggle = document.getElementById("themeToggle");


/* Check previously selected theme */

const savedTheme = localStorage.getItem("apexTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

}


/* Update theme button icon */

function updateThemeButton() {

    if (!themeToggle) {
        return;
    }

    if (document.body.classList.contains("dark-mode")) {

        themeToggle.textContent = "☀";
        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    } else {

        themeToggle.textContent = "☾";
        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    }

}


/* Set correct icon when page loads */

updateThemeButton();


/* Toggle theme */

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");


        /* Save selected theme */

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("apexTheme", "dark");

        } else {

            localStorage.setItem("apexTheme", "light");

        }


        /* Update button icon */

        updateThemeButton();

    });

}