/* ==================================================
   APEX - BLOGS JAVASCRIPT
================================================== */

const searchInput = document.getElementById("blogSearch");
const filterButtons = document.querySelectorAll(".filter-button");
const blogGrid = document.querySelector(".full-blog-grid");
const blogCount = document.getElementById("blogCount");
const noResults = document.getElementById("noResults");

let currentCategory = "all";


/* ==================================================
   ORIGINAL BLOG ARTICLE LINKS
================================================== */

const blogLinks = {
    "the evolution of formula 1 cars": "article.html?id=1",
    "how f1 tyres affect race strategy": "article.html?id=2",
    "the science behind f1 aerodynamics": "article.html?id=3",
    "why pit stops matter so much": "article.html?id=4",
    "from v10 engines to hybrid power": "article.html?id=5",
    "what makes a great f1 driver": "article.html?id=6",
    "how downforce makes f1 cars faster": "article.html?id=7",
    "the changing face of formula 1": "article.html?id=8"
};


/* ==================================================
   LOCAL STORAGE KEY
================================================== */

const customBlogStorageKey = "apexCustomBlogs";


/* ==================================================
   GET CUSTOM BLOGS
================================================== */

function getCustomBlogs() {

    return JSON.parse(
        localStorage.getItem(customBlogStorageKey)
    ) || [];

}


/* ==================================================
   SAVE CUSTOM BLOGS
================================================== */

function saveCustomBlogs(blogs) {

    localStorage.setItem(
        customBlogStorageKey,
        JSON.stringify(blogs)
    );

}


/* ==================================================
   CREATE WRITE BLOG SECTION
================================================== */

function createBlogWriter() {

    const controls = document.querySelector(".blog-controls");

    if (!controls) {
        return;
    }


    /* Avoid creating it twice */

    if (document.getElementById("writeBlogButton")) {
        return;
    }


    /* Button */

    const button = document.createElement("button");

    button.type = "button";
    button.id = "writeBlogButton";
    button.className = "write-blog-button";
    button.textContent = "WRITE A BLOG";


    /* Form */

    const writer = document.createElement("div");

    writer.id = "blogWriter";
    writer.className = "blog-writer";


    writer.innerHTML = `

        <div class="blog-writer-header">

            <div>

                <p class="blog-writer-label">
                    APEX / CREATE
                </p>

                <h2>
                    WRITE A BLOG
                </h2>

            </div>

            <button
                type="button"
                class="close-writer"
                id="closeBlogWriter"
                aria-label="Close blog form">
                ×
            </button>

        </div>


        <form id="writeBlogForm">


            <div class="writer-field">

                <label for="newBlogTitle">
                    BLOG TITLE
                </label>

                <input
                    type="text"
                    id="newBlogTitle"
                    placeholder="Enter blog title"
                    maxlength="100"
                    required>

            </div>


            <div class="writer-row">


                <div class="writer-field">

                    <label for="newBlogCategory">
                        CATEGORY
                    </label>

                    <select
                        id="newBlogCategory"
                        required>

                        <option value="">
                            Select category
                        </option>

                        <option value="technology">
                            Technology
                        </option>

                        <option value="racing">
                            Racing
                        </option>

                        <option value="history">
                            History
                        </option>

                        <option value="drivers">
                            Drivers
                        </option>

                    </select>

                </div>


                <div class="writer-field">

                    <label for="newBlogReadTime">
                        READ TIME
                    </label>

                    <input
                        type="number"
                        id="newBlogReadTime"
                        min="1"
                        max="60"
                        placeholder="Minutes"
                        required>

                </div>


            </div>


            <div class="writer-field">

                <label for="newBlogDescription">
                    DESCRIPTION
                </label>

                <textarea
                    id="newBlogDescription"
                    placeholder="Write a short description..."
                    maxlength="300"
                    required></textarea>

            </div>


            <div class="writer-field">

                <label for="newBlogImage">
                    BLOG IMAGE
                </label>

                <input
                    type="file"
                    id="newBlogImage"
                    accept="image/*"
                    required>

                <p class="image-note">
                    Upload a JPG, PNG or WEBP image.
                </p>

            </div>


            <div
                class="image-preview"
                id="imagePreview">
            </div>


            <button
                type="submit"
                class="submit-blog-button">

                PUBLISH BLOG

            </button>


            <p
                class="blog-form-message"
                id="blogFormMessage">
            </p>


        </form>

    `;


    /* Add button */

    controls.appendChild(button);


    /* Add writer after controls */

    controls.parentElement.insertBefore(
        writer,
        controls.nextSibling
    );


    /* Open */

    button.addEventListener("click", function () {

        writer.classList.add("show");

        writer.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });


    /* Close */

    document
        .getElementById("closeBlogWriter")
        .addEventListener("click", function () {

            writer.classList.remove("show");

        });


    /* Image preview */

    const imageInput =
        document.getElementById("newBlogImage");

    const imagePreview =
        document.getElementById("imagePreview");


    imageInput.addEventListener("change", function () {

        const file = imageInput.files[0];

        if (!file) {
            imagePreview.innerHTML = "";
            return;
        }


        if (!file.type.startsWith("image/")) {

            imagePreview.innerHTML =
                "<p>Please select an image file.</p>";

            imageInput.value = "";

            return;
        }


        const reader = new FileReader();


        reader.onload = function (event) {

            imagePreview.innerHTML = `

                <img
                    src="${event.target.result}"
                    alt="Blog image preview">

            `;

        };


        reader.readAsDataURL(file);

    });


    /* Form submit */

    document
        .getElementById("writeBlogForm")
        .addEventListener(
            "submit",
            handleBlogSubmit
        );

}


/* ==================================================
   RESIZE IMAGE
   Helps keep Local Storage size smaller
================================================== */

function resizeImage(file) {

    return new Promise(function (resolve, reject) {

        const reader = new FileReader();


        reader.onload = function (event) {

            const image = new Image();


            image.onload = function () {

                const maxWidth = 1200;

                let width = image.width;
                let height = image.height;


                if (width > maxWidth) {

                    height =
                        height *
                        (maxWidth / width);

                    width = maxWidth;

                }


                const canvas =
                    document.createElement("canvas");


                canvas.width = width;
                canvas.height = height;


                const context =
                    canvas.getContext("2d");


                context.drawImage(
                    image,
                    0,
                    0,
                    width,
                    height
                );


                const compressedImage =
                    canvas.toDataURL(
                        "image/jpeg",
                        0.80
                    );


                resolve(compressedImage);

            };


            image.onerror = reject;

            image.src = event.target.result;

        };


        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}


/* ==================================================
   HANDLE BLOG SUBMISSION
================================================== */

async function handleBlogSubmit(event) {

    event.preventDefault();


    const title =
        document
            .getElementById("newBlogTitle")
            .value
            .trim();


    const category =
        document
            .getElementById("newBlogCategory")
            .value;


    const readTime =
        document
            .getElementById("newBlogReadTime")
            .value;


    const description =
        document
            .getElementById("newBlogDescription")
            .value
            .trim();


    const imageFile =
        document
            .getElementById("newBlogImage")
            .files[0];


    const message =
        document.getElementById(
            "blogFormMessage"
        );


    if (!imageFile) {

        message.textContent =
            "Please upload a blog image.";

        message.className =
            "blog-form-message error";

        return;

    }


    try {

        message.textContent =
            "Publishing blog...";

        message.className =
            "blog-form-message";


        /* Convert image to compressed Data URL */

        const image =
            await resizeImage(imageFile);


        /* Create blog object */

        const newBlog = {

            id:
                "custom-" +
                Date.now(),

            title: title,

            category: category,

            readTime:
                readTime +
                " MIN READ",

            description: description,

            image: image,

            createdAt:
                new Date().toLocaleString()

        };


        /* Get existing blogs */

        const blogs =
            getCustomBlogs();


        /* Add new blog */

        blogs.push(newBlog);


        /* Save */

        try {

            saveCustomBlogs(blogs);

        } catch (storageError) {

            message.textContent =
                "Image is too large. Please upload a smaller image.";

            message.className =
                "blog-form-message error";

            return;

        }


        /* Reset form */

        document
            .getElementById("writeBlogForm")
            .reset();


        document
            .getElementById("imagePreview")
            .innerHTML = "";


        message.textContent =
            "Blog published successfully!";

        message.className =
            "blog-form-message success";


        /* Render immediately */

        renderCustomBlogs();


        /* Update count */

        filterBlogs();


        /* Close after short delay */

        setTimeout(function () {

            document
                .getElementById("blogWriter")
                .classList.remove("show");

        }, 1000);


    } catch (error) {

        console.error(error);

        message.textContent =
            "Something went wrong. Please try again.";

        message.className =
            "blog-form-message error";

    }

}


/* ==================================================
   CREATE CUSTOM BLOG CARD
================================================== */

function createCustomBlogCard(blog) {

    const card =
        document.createElement("article");


    card.className =
        "full-blog-card custom-blog-card";


    card.dataset.category =
        blog.category;


    card.dataset.title =
        blog.title.toLowerCase();


    card.dataset.customBlog =
        "true";


    const categoryName =
        blog.category.toUpperCase();


    card.innerHTML = `

        <div class="full-blog-image">

            <img
                src="${blog.image}"
                alt="${escapeHTML(blog.title)}">

        </div>


        <div class="full-blog-content">

            <p class="blog-category">
                ${categoryName}
            </p>


            <h2>
                ${escapeHTML(blog.title)}
            </h2>


            <p>
                ${escapeHTML(blog.description)}
            </p>


            <div class="full-blog-footer">

                <span>
                    ${blog.readTime}
                </span>


                <span>

                    <a
                        href="#"
                        class="custom-blog-link"
                        data-blog-id="${blog.id}">
                        READ STORY →
                    </a>

                </span>

            </div>

        </div>

    `;


    /* Custom blog story click */

    const storyLink =
        card.querySelector(
            ".custom-blog-link"
        );


    storyLink.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            showCustomBlog(blog);

        }
    );


    return card;

}


/* ==================================================
   ESCAPE HTML
================================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* ==================================================
   DISPLAY CUSTOM BLOGS
================================================== */

function renderCustomBlogs() {

    if (!blogGrid) {
        return;
    }


    /* Remove old custom cards */

    blogGrid
        .querySelectorAll(
            ".custom-blog-card"
        )
        .forEach(function (card) {

            card.remove();

        });


    const blogs =
        getCustomBlogs();


    blogs.forEach(function (blog) {

        const card =
            createCustomBlogCard(blog);


        blogGrid.appendChild(card);

    });

}


/* ==================================================
   SHOW CUSTOM BLOG STORY
================================================== */

function showCustomBlog(blog) {

    const existing =
        document.getElementById(
            "customBlogModal"
        );


    if (existing) {
        existing.remove();
    }


    const modal =
        document.createElement("div");


    modal.id =
        "customBlogModal";


    modal.className =
        "custom-blog-modal";


    modal.innerHTML = `

        <div class="custom-blog-modal-box">

            <button
                type="button"
                class="custom-blog-close"
                aria-label="Close">
                ×
            </button>


            <p class="blog-category">
                ${blog.category.toUpperCase()}
            </p>


            <h2>
                ${escapeHTML(blog.title)}
            </h2>


            <p class="custom-blog-modal-meta">
                ${blog.readTime} • APEX
            </p>


            <img
                src="${blog.image}"
                alt="${escapeHTML(blog.title)}">


            <p class="custom-blog-modal-description">
                ${escapeHTML(blog.description)}
            </p>


        </div>

    `;


    document.body.appendChild(modal);


    modal
        .querySelector(".custom-blog-close")
        .addEventListener(
            "click",
            function () {

                modal.remove();

            }
        );


    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {
                modal.remove();
            }

        }
    );

}


/* ==================================================
   SETUP ORIGINAL BLOG LINKS
================================================== */

function setupBlogLinks() {

    const blogCards =
        document.querySelectorAll(
            ".full-blog-card:not(.custom-blog-card)"
        );


    blogCards.forEach(function (card) {

        const title =
            card.dataset.title
                ? card.dataset.title
                    .toLowerCase()
                    .trim()
                : "";


        const link =
            blogLinks[title];


        if (!link) {
            return;
        }


        const arrow =
            card.querySelector(
                ".card-footer span:last-child"
            );


        if (!arrow) {
            return;
        }


        if (arrow.querySelector("a")) {
            return;
        }


        const titleText =
            card.dataset.title ||
            "blog article";


        arrow.innerHTML = `

            <a
                href="${link}"
                aria-label="Read ${escapeHTML(titleText)}"
                class="blog-card-link">

                →

            </a>

        `;

    });

}


/* ==================================================
   FILTER BLOGS
================================================== */

function filterBlogs() {

    if (!searchInput || !blogCount || !noResults) {
        return;
    }


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const blogCards =
        document.querySelectorAll(
            ".full-blog-card"
        );


    let visibleBlogs = 0;


    blogCards.forEach(function (card) {

        const category =
            card.dataset.category || "";


        const title =
            card.dataset.title || "";


        const matchesCategory =
            currentCategory === "all" ||
            category === currentCategory;


        const matchesSearch =
            title.includes(searchText);


        if (
            matchesCategory &&
            matchesSearch
        ) {

            card.style.display =
                "block";

            visibleBlogs++;

        } else {

            card.style.display =
                "none";

        }

    });


    blogCount.textContent =
        visibleBlogs;


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

    button.addEventListener(
        "click",
        function () {

            filterButtons.forEach(
                function (btn) {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add(
                "active"
            );


            currentCategory =
                button.dataset.category;


            filterBlogs();

        }
    );

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
   INITIALIZE
================================================== */

createBlogWriter();

renderCustomBlogs();

setupBlogLinks();

filterBlogs();
