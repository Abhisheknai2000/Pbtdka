const sheetID = "1xwRMs5i1KFZq9AyDr_XbnD53srpoV8gYuKxRLXaPt7U";
const url = `https://opensheet.elk.sh/${sheetID}/Sheet1`;

let allMovies = [];

// 🔥 Fetch data
fetch(url)
.then(res => res.json())
.then(data => {
  allMovies = data;
  displayMovies(data);
});

// 🔥 Display movies
function displayMovies(data){
  let html = "";

  data.forEach(item => {

    // ✅ Encode video link (important)
    let video = encodeURIComponent(item['video link']);

    // ✅ Image fix (hotlink bypass)
    let img = "https://images.weserv.nl/?url=" + encodeURIComponent(item['image link']);

    html += `
      <div class="card" onclick="playVideo('${video}')">
        <img src="${img}" loading="lazy">
        <div class="card-title">${item['Title']}</div>
      </div>
    `;
  });

  document.getElementById("movieList").innerHTML = html;
}

// 🔍 Search (fix + safe)
const searchInput = document.getElementById("search");

if(searchInput){
  searchInput.addEventListener("input", e=>{
    let val = e.target.value.toLowerCase();

    let filtered = allMovies.filter(m => 
      m['Title'] && m['Title'].toLowerCase().includes(val)
    );

    displayMovies(filtered);
  });
}

// 🎬 Play video (iframe)
function playVideo(link){
  link = decodeURIComponent(link);

  const frame = document.getElementById("videoFrame");

  if(frame){
    frame.src = link;
    document.getElementById("playerModal").style.display = "block";
  } else {
    alert("Player not found!");
  }
}

// ❌ Close player
function closePlayer(){
  const frame = document.getElementById("videoFrame");

  if(frame){
    frame.src = "";
  }

  document.getElementById("playerModal").style.display = "none";
}
