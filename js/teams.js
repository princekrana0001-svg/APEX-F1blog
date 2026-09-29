/* ==================================================
   APEX - TEAMS PAGE JAVASCRIPT
================================================== */


/* ==================================================
   SELECT ELEMENTS
================================================== */

const teamSearch =
    document.getElementById("teamSearch");


const teamCards =
    document.querySelectorAll(".team-card");


const teamCount =
    document.getElementById("teamCount");


const teamNoResults =
    document.getElementById("teamNoResults");



/* ==================================================
   FILTER TEAMS
================================================== */

function filterTeams() {

    const searchText =
        teamSearch.value
            .toLowerCase()
            .trim();


    let visibleTeams = 0;


    teamCards.forEach(function (card) {


        const teamName =
            card.dataset.name
                .toLowerCase();


        const matchesSearch =
            teamName.includes(searchText);


        if (matchesSearch) {

            card.style.display = "block";

            visibleTeams++;

        } else {

            card.style.display = "none";

        }

    });


    /* Update team count */

    teamCount.textContent =
        visibleTeams;



    /* Show / hide no-result message */

    if (visibleTeams === 0) {

        teamNoResults.classList.add("show");

    } else {

        teamNoResults.classList.remove("show");

    }

}



/* ==================================================
   SEARCH EVENT
================================================== */

if (teamSearch) {

    teamSearch.addEventListener(
        "input",
        filterTeams
    );

}



/* ==================================================
   INITIAL LOAD
================================================== */

filterTeams();