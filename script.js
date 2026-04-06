const sheetURL = "https://opensheet.elk.sh/1xwRMs5i1KFZq9AyDr_XbnD53srpoV8gYuKxRLXaPt7U/Sheet1";

fetch(sheetURL)
.then(res => res.json())
.then(data => {
    const container = document.getElementById("movies");

    data.forEach(movie => {
        const card = document.createElement("div");
        card.className = "card";

        // CHANGE THESE ACCORDING TO YOUR SHEET
        const title = movie.Title;
        const image = movie.Image;
        const video = movie.Video;

        card.innerHTML = `
            <img src="${image}" alt="${title}">
            <div class="card-title">${title}</div>
        `;

        card.onclick = () => {
            window.location.href = `/watch?video=${encodeURIComponent(video)}&title=${encodeURIComponent(title)}`;
        };

        container.appendChild(card);
    });
});
