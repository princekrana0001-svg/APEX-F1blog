# APEX - Formula 1 Blogging Website

Stories. Speed. Technology.

APEX is a modern, responsive, frontend-based Formula 1 blogging website developed using HTML5, CSS3, and JavaScript.

The project provides a platform for exploring Formula 1 content including blogs, drivers, teams, racing, technology, and Formula 1 history.

## About the Project

APEX is a multi-page Formula 1 blogging website created as a frontend web development project.

Users can explore Formula 1 blogs, search and filter articles, view information about drivers and teams, read individual articles, switch between light and dark themes, and submit feedback.

The project is completely frontend-based and does not require a backend server or database.

## Project Objectives

- Develop a complete multi-page website using HTML, CSS, and JavaScript.
- Create a professional Formula 1 themed user interface.
- Implement responsive web design.
- Implement JavaScript-based search and filtering.
- Create interactive driver and team sections.
- Implement a feedback form.
- Store feedback using Browser Local Storage.
- Understand multi-page website navigation.
- Deploy a static website using GitHub Pages.

## Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Website structure and content |
| CSS3 | Styling, layout, and responsive design |
| JavaScript | Interactivity and dynamic functionality |
| Local Storage API | Storing feedback data in the browser |
| Git | Version control |
| GitHub | Repository hosting |
| GitHub Pages | Website deployment |

## Features

### Home Page

The homepage includes:

- Hero section
- Featured blog
- Latest blogs
- Explore section
- Drivers section
- Teams section
- Technology section
- History section
- About section
- Footer navigation
- Submit Feedback button

### Blogs

The Blogs page contains Formula 1 articles covering different topics.

Blog categories include:

- Technology
- Racing
- History
- Drivers

Features include:

- Blog cards
- Featured images
- Category labels
- Search functionality
- Category filtering
- Dynamic result count
- No-results message
- Read Story links

### Individual Articles

Users can open individual articles using the Read Story option.

Each article contains:

- Article title
- Category
- Article information
- Featured image
- Introduction
- Main content
- Sidebar information
- Back to Blogs navigation

### Drivers

The Drivers page provides information about Formula 1 drivers.

Drivers included:

- Lando Norris
- Oscar Piastri
- Charles Leclerc
- Lewis Hamilton
- Max Verstappen
- George Russell
- Fernando Alonso
- Carlos Sainz

Features include:

- Driver images
- Driver numbers
- Nationality
- Date of birth
- Team information
- Driver search
- Dynamic driver count
- Responsive cards
- Hover-based information display

### Teams

The Teams page provides information about Formula 1 teams.

Teams included:

- McLaren
- Ferrari
- Red Bull Racing
- Mercedes
- Aston Martin
- Williams
- Alpine
- Haas
- RB
- Sauber

Features include:

- Team images
- Team information
- Team search
- Dynamic team count
- Responsive cards
- Hover-based information display

### Feedback

The website includes a dedicated Feedback page accessible through the Submit Feedback button in the footer.

The feedback form includes:

- Name
- Email
- Star rating
- Feedback or suggestions

The rating system allows users to select between 1 and 5 stars.

## Local Storage

Since APEX is a frontend-only website, the feedback system uses the browser's Local Storage API.

Submitted feedback contains:

```javascript
{
    name: "User Name",
    email: "user@example.com",
    rating: "5",
    message: "Great website!",
    date: "Submission Date and Time"
}
