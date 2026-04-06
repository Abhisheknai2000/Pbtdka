const sheetURL = "https://opensheet.elk.sh/1xwRMs5i1KFZq9AyDr_XbnD53srpoV8gYuKxRLXaPt7U/Sheet1";

fetch(sheetURL)
.then(res => res.json())
.then(data => {
    const container = document.getElementById("movies");

    data.forEach(movie => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <div class="card-title">${movie.title}</div>
        `;

        card.onclick = () => {
            window.location.href = `watch.html?video=${encodeURIComponent(movie.video)}&title=${encodeURIComponent(movie.title)}`;
        };

        container.appendChild(card);
    });
});
