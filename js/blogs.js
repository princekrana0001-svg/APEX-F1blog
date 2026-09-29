/* ==================================================
   APEX - BLOG PAGE JAVASCRIPT
================================================== */


/* ==================================================
   SELECT ELEMENTS
================================================== */

const searchInput = document.getElementById("blogSearch");

const filterButtons = document.querySelectorAll(".filter-button");

const blogCards = document.querySelectorAll(".full-blog-card");

const blogCount = document.getElementById("blogCount");

const noResults = document.getElementById("noResults");


/* ==================================================
   CURRENT CATEGORY
================================================== */

let currentCategory = "all";


/* ==================================================
   FILTER BLOGS
================================================== */

function filterBlogs() {

    const searchText =
        searchInput.value.toLowerCase().trim();


    let visibleBlogs = 0;


    blogCards.forEach(function (card) {


        const category =
            card.dataset.category;


        const title =
            card.dataset.title.toLowerCase();


        const matchesCategory =
            currentCategory === "all" ||
            category === currentCategory;


        const matchesSearch =
            title.includes(searchText);


        if (matchesCategory && matchesSearch) {

            card.style.display = "block";

            visibleBlogs++;

        } else {

            card.style.display = "none";

        }

    });


    /* Update count */

    blogCount.textContent = visibleBlogs;


    /* Show / hide no result message */

    if (visibleBlogs === 0) {

        noResults.classList.add("show");

    } else {

        noResults.classList.remove("show");

    }

}


/* ==================================================
   CATEGORY BUTTONS
================================================== */

filterButtons.forEach(function (button) {


    button.addEventListener("click", function () {


        /* Remove active class */

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        /* Add active class */

        button.classList.add("active");


        /* Get selected category */

        currentCategory =
            button.dataset.category;


        /* Filter */

        filterBlogs();

    });

});


/* ==================================================
   SEARCH
================================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterBlogs
    );

}


/* ==================================================
   INITIAL LOAD
================================================== */

filterBlogs();