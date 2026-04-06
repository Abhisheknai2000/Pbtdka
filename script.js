const sheetURL = "https://opensheet.elk.sh/1xwRMs5i1KFZq9AyDr_XbnD53srpoV8gYuKxRLXaPt7U/Sheet1";

fetch(sheetURL)
.then(res => res.json())
.then(data => {
    const container = document.getElementById("movies");
    container.innerHTML = "";

    data.forEach(movie => {
        const card = document.createElement("div");
        card.className = "card";

        // 🔥 DEBUG
        console.log("Movie object:", movie);

        // ✅ SAFE VALUES
        const title = movie.Title || movie.title || "No Title";
        const image = movie.Image || movie.image || "https://via.placeholder.com/300x400?text=No+Image";
        
        // ✅ VIDEO DETECT (ALL CASES)
        const video = (
            movie.video ||
            movie.Video ||
            movie.link ||
            movie.Link ||
            movie.url ||
            movie.Url ||
            ""
        ).trim();

        card.innerHTML = `
            <img src="${image}" alt="${title}" loading="lazy">
            <div class="card-title">${title}</div>
        `;

        card.onclick = () => {
            console.log("VIDEO LINK:", video);

            if (video) {
                // 🔥 IMPORTANT FIX (FILE NAME MATCH)
                window.location.href = `Watchplayer.html?video=${encodeURIComponent(video)}&title=${encodeURIComponent(title)}`;
            } else {
                alert("Video link not available");
            }
        };

        container.appendChild(card);
    });
})
.catch(err => {
    console.error("Error loading sheet:", err);
});
