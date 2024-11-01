// بارگذاری داده‌های JSON و نمایش عنوان و آهنگ‌های خواننده انتخاب شده
const urlParams = new URLSearchParams(window.location.search);
const singer = urlParams.get("singer");

fetch("/data/song.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const singerData = data[singer]; // داده‌های مربوط به خواننده انتخاب شده
    if (singerData) {
      displayTitle(singerData.title); // نمایش عنوان
      createCards(singerData.songs, "song-list"); // نمایش آهنگ‌ها
    } else {
      console.error("Singer not found in data");
    }
  })
  .catch((error) => console.error("Error loading songs:", error));

// تابع برای نمایش عنوان در بالای صفحه
// تابع برای نمایش عنوان با متن ثابت در بالای صفحه
function displayTitle(title) {
  const titleElement = document.getElementById("page-title");
  titleElement.textContent = `آهنگ های ${title}`; // اضافه کردن متن ثابت به عنوان
}

// تابع برای ایجاد کارت‌های آهنگ‌ها
function createCards(data, containerId) {
  const container = document.getElementById(containerId);
  // container.innerHTML = ""; // پاکسازی محتوا
  data.forEach((item) => {
    const cardHTML = CreateSongAndRemixHtml(item);
    container.insertAdjacentHTML("beforeend", cardHTML);
  });
}

// بارگذاری داده‌های ریمیکس ها
fetch("/data/remixes.json")
  .then((response) => response.json())
  .then((data) => {
    const selectedRemixes = [2, 4, 3, 1]
      .map((id) => data.remixes.find((item) => item.id === id))
      .filter((item) => item !== undefined);
    createCards(selectedRemixes, "remixes-list");
  })
  .catch((error) => console.error("Error loading remixes:", error));
