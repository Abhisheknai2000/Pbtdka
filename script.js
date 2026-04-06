const sheetURL = "https://opensheet.elk.sh/1xwRMs5i1KFZq9AyDr_XbnD53srpoV8gYuKxRLXaPt7U/Sheet1";

fetch(sheetURL)
.then(res => res.json())
.then(data => {
    const container = document.getElementById("movies");
    container.innerHTML = "";

    data.forEach(movie => {
        const card = document.createElement("div");
        card.className = "card";

        const title = movie.Title || movie.title || "No Title";
        const image = movie.Image || movie.image || "";
        const video = (movie.video || movie.Video || "").trim();

        card.innerHTML = `
            <img src="${image}" alt="${title}">
            <div class="card-title">${title}</div>
        `;

        card.onclick = () => {
            if(video) {
                // ✅ FIXED ROUTE
                window.location.href = `/watch?video=${encodeURIComponent(video)}&title=${encodeURIComponent(title)}`;
            } else {
                alert("Video link not available");
            }
        };

        container.appendChild(card);
    });
});
