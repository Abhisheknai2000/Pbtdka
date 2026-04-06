const sheetURL = "https://opensheet.elk.sh/1xwRMs5i1KFZq9AyDr_XbnD53srpoV8gYuKxRLXaPt7U/Sheet1";

fetch(sheetURL)
.then(res => res.json())
.then(data => {
    const container = document.getElementById("movies");

    container.innerHTML = ""; // clear before load

    data.forEach(movie => {
        const card = document.createElement("div");
        card.className = "card";

        // ✅ Safe values (undefined fix)
        const title = movie.Title || "No Title";
        const image = movie.Image || "https://via.placeholder.com/300x400?text=No+Image";
        const video = movie.Video || "";

        card.innerHTML = `
            <img src="${image}" alt="${title}" loading="lazy">
            <div class="card-title">${title}</div>
        `;

        // ✅ FIXED CLICK (GitHub + Vercel working)
        card.onclick = () => {
            if(video) {
                window.location.href = `watch.html?video=${encodeURIComponent(video)}&title=${encodeURIComponent(title)}`;
            } else {
                alert("Video link not available");
            }
        };

        container.appendChild(card);
    });
})
.catch(err => {
    console.error("Error loading data:", err);
});
