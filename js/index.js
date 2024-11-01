// StarT main-1: بارگذاری آرتیست‌ها
fetch("/data/artic.json")
  .then((response) => response.json())
  .then((data) => {
    const songList = document.getElementById("allartic");
    data.artic.forEach(({ image, title, id }) => {
      const songCard = document.createElement("div");
      songCard.className = "item";
      songCard.innerHTML = CreateArticHtml(image, title, id);
      songList.appendChild(songCard);
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));

// EnD main-1

// StarT main-2 & main-3: بارگذاری آهنگ‌ها و ریمیکس‌ها
function createCards(data, containerId) {
  const container = document.getElementById(containerId);
  data.forEach((item) => {
    const cardHTML = CreateSongAndRemixHtml(item);
    container.insertAdjacentHTML("beforeend", cardHTML);
  });
}

// بارگذاری آهنگ‌ها با ساختار JSON جدید
const loadAndCreateSongs = (filePath, selectedIds, containerId) => {
  fetch(filePath)
    .then((response) => response.json())
    .then((data) => {
      const allSongs = [];

      // جمع‌آوری تمامی آهنگ‌ها از تمامی آرتیست‌ها
      Object.keys(data).forEach((singer) => {
        const singerSongs = data[singer].songs;
        allSongs.push(...singerSongs); // اضافه کردن آهنگ‌ها به لیست
      });

      // فیلتر کردن آهنگ‌ها با استفاده از selectedIds
      const items = selectedIds
        .map((id) => allSongs.find((item) => item.id === id))
        .filter(Boolean);

      createCards(items, containerId);
    })
    .catch((error) => console.error("Error loading JSON:", error));
};

// بارگذاری و نمایش آهنگ‌های اصلی
loadAndCreateSongs("/data/song.json", [1, 2, 3, 4], "song-list");

// بارگذاری ریمیکس‌ها بدون تغییر
const loadAndCreateRemixes = (filePath, selectedIds, containerId) => {
  fetch(filePath)
    .then((response) => response.json())
    .then((data) => {
      const items = selectedIds
        .map((id) => data.remixes.find((item) => item.id === id))
        .filter(Boolean);
      createCards(items, containerId);
    })
    .catch((error) => console.error("Error loading remixes:", error));
};

// بارگذاری داده‌های ریمیکس
loadAndCreateRemixes("/data/remixes.json", [1, 6, 2, 5, 3, 4], "remixes-list");
// EnD main-2 & main-3
