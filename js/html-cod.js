// تصویر پیفرض برای عکس های خراب
OnerrordefaultImage = "eror-img.png";

function CreateArticHtml(image, title, id) {
  return `
        <a href="song.html?singer=${id}">
            <div class="img">
            <div class="skeleton-loader"></div>
                <img src="${image}" alt="${title}" onload="imageLoaded(this)" onerror="this.onerror=null; this.src=OnerrordefaultImage;" >
            </div>
            <h3>${title}</h3>
            </a>
    `;
}

function CreateSongAndRemixHtml(item) {
  return `
        <div class="item">
            <div class="right">
                <div class="img">
                <div class="skeleton-loader"></div>
                    <img src="${item.image}" alt="${item.title}" onload="imageLoaded(this)" onerror="this.onerror=null; this.src=OnerrordefaultImage;" >
                </div>
                <div class="text">
                    <p class="n-music">${item.title}</p>
                    <p class="name">${item.artist}</p>
                </div>
            </div>
            <div class="left">
                <img src="svg/p.svg" class="play-btn" onclick="playMusic('${item.file}', '${item.title}', '${item.artist}', '${item.image}', this)">
                <img src="svg/d.svg" id="download-btn" onclick="downloadMusic('${item.file}')">
            </div>
        </div>
    `;
}

//  لودر تصویر
function imageLoaded(img) {
  const loader = img.previousElementSibling;
  loader.style.display = "none";
  img.style.display = "block";
}
