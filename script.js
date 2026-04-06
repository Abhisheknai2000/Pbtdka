const sheetURL = "https://opensheet.elk.sh/1xwRMs5i1KFZq9AyDr_XbnD53srpoV8gYuKxRLXaPt7U/Sheet1";

fetch(sheetURL)
.then(res => res.json())
.then(data => {
    const container = document.getElementById("movies");
    container.innerHTML = "";

    data.forEach(movie => {
        const card = document.createElement("div");
        card.className = "card";

        // ✅ EXACT MATCH (lowercase)
        const title = movie.Title || "No Title";
        const image = movie.Image || "";
        const video = movie.video || ""; // 🔥 yahi fix hai

        card.innerHTML = `
            <img src="${image}" alt="${title}">
            <div class="card-title">${title}</div>
        `;

        card.onclick = () => {
            if(video) {
                window.location.href = `watch.html?video=${encodeURIComponent(video)}&title=${encodeURIComponent(title)}`;
            } else {
                alert("Video link not available");
            }
        };

        container.appendChild(card);
    });
});
