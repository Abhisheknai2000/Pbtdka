const sheetURL = "https://opensheet.elk.sh/1xwRMs5i1KFZq9AyDr_XbnD53srpoV8gYuKxRLXaPt7U/Sheet1";
let allMovies = []; 

document.addEventListener("DOMContentLoaded", () => {
    loadWatchHistory();
    triggerFloatingAd(); // Page load par floating ad initialize karna
});

fetch(sheetURL)
.then(res => res.json())
.then(data => {
    allMovies = data; 
    displayMovies(allMovies); 
})
.catch(err => {
    console.error("Error loading sheet:", err);
});

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

        const title = movie.Title || movie.title || "No Title";
        const image = movie.Image || movie.image || "https://via.placeholder.com/300x400?text=No+Image";
        const video = (movie.video || movie.Video || "").trim();

        card.innerHTML = `
            <img src="${image}" alt="${title}" loading="lazy">
            <div class="card-title">${title}</div>
        `;

        card.onclick = () => {
            if (video) {
                window.location.href = `watch.html?video=${encodeURIComponent(video)}&title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}`;
            } else {
                alert("Video link not available");
            }
        };
        container.appendChild(card);
    });
}

// 🕒 LOAD WATCH HISTORY FUNCTION
function loadWatchHistory() {
    const historySection = document.getElementById("history-section");
    const historyContainer = document.getElementById("history-movies");
    const history = JSON.parse(localStorage.getItem("watch_history") || "[]");

    if (history.length === 0) {
        historySection.style.display = "none";
        return;
    }

    historySection.style.display = "block";
    historyContainer.innerHTML = "";

    history.forEach(movie => {
        const card = document.createElement("div");
        card.className = "card";
        
        card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" loading="lazy">
            <div class="card-title">${movie.title}</div>
        `;

        card.onclick = () => {
            window.location.href = `watch.html?video=${encodeURIComponent(movie.video)}&title=${encodeURIComponent(movie.title)}&image=${encodeURIComponent(movie.image)}`;
        };

        historyContainer.appendChild(card);
    });
}

// ❌ CLEAR HISTORY BUTTON CLICK
document.getElementById("clear-history").onclick = () => {
    if(confirm("Kya aap saari history delete karna chahte hain?")) {
        localStorage.removeItem("watch_history");
        loadWatchHistory(); 
    }
};

// 📢 🔥 FLOATING AD AUTO TIMED CONTROL LOGIC
function triggerFloatingAd() {
    const adContainer = document.getElementById("popup-ad-container");
    const closeBtn = document.getElementById("manual-close-ad");
    const timerText = document.getElementById("ad-timer-text");
    
    let timeLeft = 15; // 15 Seconds Countdown timer

    // 1. Page load hone ke 2 second baad screen me slide-in karein (thoda delay safe lagta hai)
    setTimeout(() => {
        adContainer.classList.add("show");
        
        // 2. Countdown loop trigger
        const adInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                timerText.innerText = `Closing in ${timeLeft}s...`;
            } else {
                clearInterval(adInterval);
                closeAd(); // 15 seconds baad automatic slide-out close
            }
        }, 1000);

        // 3. User manual-close (cross button) operation
        closeBtn.onclick = () => {
            clearInterval(adInterval);
            closeAd();
        };

    }, 2000);

    function closeAd() {
        adContainer.classList.remove("show"); // Slide-out effect trigger
        // Slide out ke baad completely disable karna taaki user layout click block na ho
        setTimeout(() => {
            adContainer.style.display = "none";
        }, 600);
    }
}

// 🔍 SEARCH LOGIC
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search");

searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const historySection = document.getElementById("history-section");

    if (searchTerm.length > 0) {
        clearSearchBtn.style.display = "block";
        historySection.style.display = "none"; 
    } else {
        clearSearchBtn.style.display = "none";
        loadWatchHistory();
    }

    const filteredMovies = allMovies.filter(movie => {
        const title = (movie.Title || movie.title || "").toLowerCase();
        return title.includes(searchTerm);
    });
    displayMovies(filteredMovies);
});

clearSearchBtn.onclick = () => {
    searchInput.value = "";
    clearSearchBtn.style.display = "none";
    loadWatchHistory();
    displayMovies(allMovies);
    searchInput.focus();
};
