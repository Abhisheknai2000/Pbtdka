const sheetID = "1xwRMs5i1KFZq9AyDr_XbnD53srpoV8gYuKxRLXaPt7U";
const url = `https://opensheet.elk.sh/${sheetID}/Sheet1`;

let allMovies = [];

fetch(url)
.then(res => res.json())
.then(data => {
  allMovies = data;
  displayMovies(data);
});

function displayMovies(data){
  let html = "";
  data.forEach(item => {
    html += `
      <div class="card" onclick="playVideo('${item['video link']}')">
        <img src="${item['image link']}">
        <div>${item['Title']}</div>
      </div>
    `;
  });
  document.getElementById("movieList").innerHTML = html;
}

// Search
document.getElementById("search").addEventListener("input", e=>{
  let val = e.target.value.toLowerCase();
  let filtered = allMovies.filter(m=>m['Title'].toLowerCase().includes(val));
  displayMovies(filtered);
});

// Player
const player = document.getElementById("videoPlayer");

function playVideo(link){
  player.src = link;
  document.getElementById("playerModal").style.display = "block";
  player.play();
}

function closePlayer(){
  player.pause();
  player.src = "";
  document.getElementById("playerModal").style.display = "none";
}

function forward(){ player.currentTime += 10; }
function back(){ player.currentTime -= 10; }

document.getElementById("volume").oninput = e=>{
  player.volume = e.target.value;
};

function fullscreen(){
  if(player.requestFullscreen) player.requestFullscreen();
}