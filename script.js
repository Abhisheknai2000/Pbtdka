const sheetID = "1xwRMs5i1KFZq9AyDr_XbnD53srpoV8gYuKxRLXaPt7U";
const url = `https://opensheet.elk.sh/${sheetID}/Sheet1`;

let html = "";

fetch(url)
.then(res => res.json())
.then(data => {

  data.forEach(item => {

    let video = encodeURIComponent(item['video link']);

    html += `
      <div class="card" onclick="playVideo('${video}')">
        <img src="${item['image link']}">
        <div>${item['Title']}</div>
      </div>
    `;
  });

  document.getElementById("movieList").innerHTML = html;
});

const player = document.getElementById("videoPlayer");

function playVideo(link){
  link = decodeURIComponent(link);
  player.src = link;
  document.getElementById("playerModal").style.display = "block";
  player.play();
}

function closePlayer(){
  player.pause();
  player.src = "";
  document.getElementById("playerModal").style.display = "none";
}
