/* ==================================================
   APEX - DRIVERS PAGE JAVASCRIPT
================================================== */


/* ==================================================
   SELECT ELEMENTS
================================================== */

const driverSearch =
    document.getElementById("driverSearch");


const driverCards =
    document.querySelectorAll(".driver-card");


const driverCount =
    document.getElementById("driverCount");


const driverNoResults =
    document.getElementById("driverNoResults");



/* ==================================================
   FILTER DRIVERS
================================================== */

function filterDrivers() {

    const searchText =
        driverSearch.value
            .toLowerCase()
            .trim();


    let visibleDrivers = 0;


    driverCards.forEach(function (card) {


        const driverName =
            card.dataset.name
                .toLowerCase();


        const teamName =
            card.dataset.team
                .toLowerCase();


        const matchesSearch =
            driverName.includes(searchText) ||
            teamName.includes(searchText);


        if (matchesSearch) {

            card.style.display = "block";

            visibleDrivers++;

        } else {

            card.style.display = "none";

        }

    });


    /* Update driver count */

    driverCount.textContent =
        visibleDrivers;



    /* Show / hide no-result message */

    if (visibleDrivers === 0) {

        driverNoResults.classList.add("show");

    } else {

        driverNoResults.classList.remove("show");

    }

}



/* ==================================================
   SEARCH EVENT
================================================== */

if (driverSearch) {

    driverSearch.addEventListener(
        "input",
        filterDrivers
    );

}



/* ==================================================
   INITIAL LOAD
================================================== */

filterDrivers();