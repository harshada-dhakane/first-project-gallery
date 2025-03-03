// Unsplash API Access Key (Replace with your own API key if needed)
const accessKey = "5hhuyk_bv0gzM7p7vF_TLwEUcUXtF6d6zdxscNXVBk8";

// Selecting elements from the DOM
const formEl = document.querySelector("form"); // Form element
const inputEl = document.getElementById("search-input"); // Search input field
const searchResults = document.querySelector(".search-results"); // Container for displaying results
const showMore = document.getElementById("show-more-button"); // "Show More" button

// Variables to store search data
let inputData = ""; // User input
let page = 1; // Tracks the current page of results

// Function to fetch images from Unsplash API
async function searchImages() {
    inputData = inputEl.value; // Get user input from the search box
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    // Fetch data from the API
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results; // Get the image results

    // Clear previous search results if it's a new search
    if (page === 1) {
        searchResults.innerHTML = "";
    }

    // Loop through each image result
    results.map((result) => {
        const imageWrapper = document.createElement("div"); // Create a div for each result
        imageWrapper.classList.add("search-result"); // Add class for styling

        const image = document.createElement("img"); // Create an img element
        image.src = result.urls.small; // Set image source URL
        image.alt = result.alt_description; // Set image description

        const imageLink = document.createElement("a"); // Create an anchor tag
        imageLink.href = result.links.html; // Set Unsplash image link
        imageLink.target = "_blank"; // Open link in new tab
        imageLink.textContent = result.alt_description; // Set link text

        // Append image and link to the wrapper
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);

        // Append the wrapper to the search results container
        searchResults.appendChild(imageWrapper);
    });

    // Increment page number for next set of results
    page++;

    // Display "Show More" button if more pages are available
    if (page > 1) {
        showMore.style.display = "block";
    }
}

// Event listener for form submission
formEl.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload
    page = 1; // Reset page number for new search
    searchImages(); // Call function to fetch images
});

// Event listener for "Show More" button
showMore.addEventListener("click", () => {
    searchImages(); // Fetch more images
});


//Dark mode button

const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "☀️"; // Change to light mode icon
    } else {
        darkModeToggle.textContent = "🌙"; // Change to dark mode icon
    }
});
