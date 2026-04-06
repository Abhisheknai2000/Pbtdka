const sheetURL = "https://opensheet.elk.sh/1xwRMs5i1KFZq9AyDr_XbnD53srpoV8gYuKxRLXaPt7U/Sheet1";

fetch(sheetURL)
.then(res => res.json())
.then(data => {
    const container = document.getElementById("movies");
    container.innerHTML = "";

    data.forEach(movie => {
        const card = document.createElement("div");
        card.className = "card";

        // 🔥 sab keys print karo
        console.log("Movie object:", movie);

        const title = movie.Title || movie.title || "";
        const image = movie.Image || movie.image || "";
        
        // 🔥 ALL POSSIBLE KEYS
        const video = movie.video || movie.Video || movie.link || movie.Link || movie.url || movie.Url || "";

        card.innerHTML = `
            <img src="${image}" alt="${title}">
            <div class="card-title">${title}</div>
        `;

        card.onclick = () => {
            console.log("VIDEO LINK:", video); // 👈 check click pe

            if(video && video.trim() !== "") {
                window.location.href = `watch.html?video=${encodeURIComponent(video)}&title=${encodeURIComponent(title)}`;
            } else {
                alert("Video link not available");
            }
        };

        container.appendChild(card);
    });
});
