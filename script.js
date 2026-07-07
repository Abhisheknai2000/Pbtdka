const sheetURL = "https://opensheet.elk.sh/1xwRMs5i1KFZq9AyDr_XbnD53srpoV8gYuKxRLXaPt7U/Sheet1";
let allMovies = []; // Saari movies ka data save rakhne ke liye global array

// Movies load karne ka main function
fetch(sheetURL)
.then(res => res.json())
.then(data => {
    allMovies = data; // Data ko array me store kiya
    displayMovies(allMovies); // Movies ko screen par dikhaya
})
.catch(err => {
    console.error("Error loading sheet:", err);
});

// 🎬 Movies Screen Par Render karne ka function
function displayMovies(moviesList) {
    const container = document.getElementById("movies");
    container.innerHTML = "";

    if (moviesList.length === 0) {
        container.innerHTML = `<div style="grid-column: span 12; text-align: center; color: #888; margin-top: 50px;">No movies found!</div>`;
        return;
    }

    moviesList.forEach(movie => {
        const card = document.createElement("div");
        card.className = "card";

        // ✅ SAFE DATA
        const title = movie.Title || movie.title || "No Title";
        const image = movie.Image || movie.image || "https://via.placeholder.com/300x400?text=No+Image";
        const video = (movie.video || movie.Video || "").trim();

        // 🎬 CARD HTML
        card.innerHTML = `
            <img src="${image}" alt="${title}" loading="lazy">
            <div class="card-title">${title}</div>
        `;

        // 👉 CLICK EVENT
        card.onclick = () => {
            if (video) {
                window.location.href = `watch.html?video=${encodeURIComponent(video)}&title=${encodeURIComponent(title)}`;
            } else {
                alert("Video link not available");
            }
        };

        container.appendChild(card);
    });
}

// 🔍 SEARCH LOGIC IMPLEMENTATION
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search");

searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    // Cross (X) button show/hide karne ke liye
    if (searchTerm.length > 0) {
        clearSearchBtn.style.display = "block";
    } else {
        clearSearchBtn.style.display = "none";
    }

    // Title ke basis par filter lagana
    const filteredMovies = allMovies.filter(movie => {
        const title = (movie.Title || movie.title || "").toLowerCase();
        return title.includes(searchTerm);
    });

    displayMovies(filteredMovies);
});

// ❌ CLEAR BUTTON CLICK EVENT
clearSearchBtn.onclick = () => {
    searchInput.value = "";
    clearSearchBtn.style.display = "none";
    displayMovies(allMovies); // Wapas saari movies dikhao
    searchInput.focus();
};
