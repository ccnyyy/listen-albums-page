const MIN = 23;
const MAX = 37;

let albums = JSON.parse(localStorage.getItem("albums")) || [];

if (albums.length === 0) {
    for (let i = 0; i < MIN; i++) {
        albums.push({
            title: "none",
            artist: "none",
            image: ""
        });
    }
}

const albumList = document.getElementById("albumList");

function renderPhase1() {
    albumList.innerHTML = "";

    for (let i = 0; i < 8; i++) {

        const album = albums[i];

        const div = document.createElement("div");
        div.className = "album-item";

        div.innerHTML = `
            <div class="number">${String(i+1).padStart(2,"0")}</div>
            <div class="thumbnail" style="background-image:url('${album.image}'); background-size:cover;"></div>
            <div>
                <div class="info-title">${album.title}</div>
                <div class="info-artist">${album.artist}</div>
            </div>
        `;

        albumList.appendChild(div);
    }
}

document.getElementById("shuffleBtn").addEventListener("click", () => {
    if (albums.length < MIN) {
        alert("Minimum 23 albums required.");
        return;
    }

    albums.sort(() => Math.random() - 0.5);
    localStorage.setItem("albums", JSON.stringify(albums));
    renderPhase1();
});

document.getElementById("folderBtn").addEventListener("click", () => {
    document.getElementById("folderPanel").classList.remove("hidden");
    renderPhase2();
});

document.getElementById("closeFolder").onclick = () => {
    document.getElementById("folderPanel").classList.add("hidden");
};

function renderPhase2() {
    const custom = document.getElementById("customList");
    custom.innerHTML = "";

    albums.forEach((album, index) => {

        const row = document.createElement("div");
        row.innerHTML = `
            <input type="text" value="${album.image}" placeholder="Image URL">
            <input type="text" value="${album.title}">
            <input type="text" value="${album.artist}">
        `;

        custom.appendChild(row);
    });
}

document.getElementById("saveAll").onclick = () => {
    const rows = document.querySelectorAll("#customList div");

    rows.forEach((row, index) => {
        const inputs = row.querySelectorAll("input");
        albums[index].image = inputs[0].value;
        albums[index].title = inputs[1].value;
        albums[index].artist = inputs[2].value;
    });

    localStorage.setItem("albums", JSON.stringify(albums));
    renderPhase1();
    alert("Saved successfully");
};

renderPhase1();
