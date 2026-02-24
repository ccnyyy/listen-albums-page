const MAX = 37;
const MIN = 23;

const spinBtn = document.getElementById("spinBtn");
const folderBtn = document.getElementById("folderBtn");
const albumList = document.getElementById("albumList");

const panel = document.getElementById("panel");
const closePanel = document.getElementById("closePanel");
const panelList = document.getElementById("panelList");
const addAlbum = document.getElementById("addAlbum");

let albums = JSON.parse(localStorage.getItem("albums")) || [];

/* ================= RENDER RIGHT ================= */

function renderRight(){
  albumList.innerHTML = "";
  albums.slice(0,8).forEach((a,i)=>{
    albumList.innerHTML += `
      <div class="album-item">
        <div class="album-number">${String(i+1).padStart(2,'0')}</div>
        <img class="album-cover" src="${a.cover}">
        <div>
          <div class="album-title">${a.title}</div>
          <div class="album-artist">${a.artist}</div>
        </div>
      </div>
    `;
  });
}

/* ================= RENDER PANEL ================= */

function renderPanel(){
  panelList.innerHTML = "";
  albums.forEach((a,i)=>{
    panelList.innerHTML += `
      <div class="album-item">
        <img class="album-cover" src="${a.cover}">
        <div>
          <div class="album-title">${a.title}</div>
          <div class="album-artist">${a.artist}</div>
        </div>
        <button onclick="editAlbum(${i})">✎</button>
        <button onclick="deleteAlbum(${i})">🗑</button>
      </div>
    `;
  });
}

/* ================= FUNCTIONS ================= */

function spin(){
  if(albums.length < MIN){
    alert("Necesitas mínimo 23 álbumes para usar la ruleta.");
    return;
  }
  albums.sort(()=>Math.random()-0.5);
  save();
  renderRight();
}

function addNew(){
  if(albums.length >= MAX){
    alert("Máximo 37 álbumes.");
    return;
  }

  const title = prompt("Título:");
  const artist = prompt("Artista:");
  const cover = prompt("URL Imagen:");

  if(title && artist && cover){
    albums.push({title,artist,cover});
    save();
    renderPanel();
    renderRight();
  }
}

function editAlbum(i){
  const title = prompt("Nuevo título:", albums[i].title);
  const artist = prompt("Nuevo artista:", albums[i].artist);
  const cover = prompt("Nueva URL:", albums[i].cover);

  albums[i] = {title,artist,cover};
  save();
  renderPanel();
  renderRight();
}

function deleteAlbum(i){
  albums.splice(i,1);
  save();
  renderPanel();
  renderRight();
}

function save(){
  localStorage.setItem("albums", JSON.stringify(albums));
}

/* ================= EVENTS ================= */

spinBtn.onclick = spin;
folderBtn.onclick = ()=>{ panel.classList.remove("hidden"); renderPanel(); };
closePanel.onclick = ()=> panel.classList.add("hidden");
addAlbum.onclick = addNew;

/* ================= INIT ================= */

renderRight();
