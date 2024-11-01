// ایجاد شیء Audio برای پخش فایل‌های صوتی
const audio = new Audio();
let isPlaying = false; // وضعیت پخش آهنگ
let progressAnimation; // متغیر برای ذخیره انیمیشن نوار پیشرفت

StopSvgMain = "svg/s.svg";
PlaySvgMain = "svg/p.svg";
PlayBtn = ".play-btn";

// تابع برای پخش آهنگ و تنظیم مشخصات پلیر
function playMusic(file, title, artist, image, playButton) {
  // بازنشانی تمامی دکمه‌های پخش به آیکون پیش‌فرض
  document.querySelectorAll(PlayBtn).forEach((btn) => (btn.src = PlaySvgMain));

  // تغییر آیکون دکمه پخش به آیکون توقف
  playButton.src = StopSvgMain;

  // نمایش پلیر و تنظیم مشخصات آهنگ
  const player = document.getElementById("player");
  player.style.display = "flex";
  document.getElementById("player-img").src = image;
  document.getElementById("player-title").textContent = title;
  document.getElementById("player-singer").textContent = artist;

  // تنظیم منبع فایل صوتی و شروع پخش
  audio.src = file;
  audio.onerror = () => handleAudioError(playButton); // مدیریت خطای عدم وجود فایل

  audio
    .play()
    .then(() => {
      isPlaying = true;
      updateProgress(); // شروع به‌روزرسانی نوار پیشرفت
      p.style.display = "block";
      s.style.display = "none";
    })
    .catch((error) => {
      console.error("Error playing audio:", error);
      handleAudioError(playButton); // نمایش خطا در صورت مشکل در پخش
    });
}

// تابع برای مدیریت خطا در صورت عدم وجود آهنگ
function handleAudioError(playButton) {
  showErrorModal("این آهنگ وجود ندارد!");
  resetPlayer(playButton);
}

// بازنشانی پلیر و توقف آهنگ
function resetPlayer(playButton) {
  audio.pause();
  isPlaying = false;
  cancelAnimationFrame(progressAnimation); // لغو انیمیشن نوار پیشرفت
  document.getElementById("player").style.display = "none";
  playButton.src = PlaySvgMain; // تغییر آیکون دکمه به حالت پیش‌فرض
  document.getElementById("progress-range").value = 0; // بازنشانی نوار پیشرفت
}

// بروزرسانی نوار پیشرفت پلیر و زمان‌ها با استفاده از requestAnimationFrame
function updateProgress() {
  const progressRange = document.getElementById("progress-range");
  const currentTimeDisplay = document.getElementById("current-time");
  const totalTimeDisplay = document.getElementById("total-time");

  if (audio.duration) {
    const currentTime = Math.floor(audio.currentTime);
    const duration = Math.floor(audio.duration);
    progressRange.value = (audio.currentTime / audio.duration) * 100; // درصد نوار پیشرفت
    currentTimeDisplay.textContent = formatTime(currentTime); // نمایش زمان فعلی
    totalTimeDisplay.textContent = formatTime(duration); // نمایش کل زمان آهنگ
  }
  // درخواست به‌روزرسانی در فریم بعدی برای حرکت روان‌تر
  if (isPlaying) {
    progressAnimation = requestAnimationFrame(updateProgress);
  }
}

// قالب‌بندی زمان به دقیقه و ثانیه
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
  }`;
}

// بروزرسانی زمان پخش هنگام تغییر نوار پیشرفت
document
  .getElementById("progress-range")
  .addEventListener("input", function () {
    audio.currentTime = (this.value / 100) * audio.duration;
  });

// دانلود فایل آهنگ
function downloadMusic(file) {
  fetch(file).then((response) => {
    if (response.ok) {
      const link = document.createElement("a");
      link.href = file;
      link.download = file.split("/").pop(); // نام فایل
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      showErrorModal("آهنگی برای دانلود وجود ندارد!");
    }
  });
}

// نمایش مودال خطا
function showErrorModal(message) {
  document.getElementById("error-message").textContent = message;
  document.getElementById("error-modal").style.display = "block";
  setTimeout(closeModal, 1000); // بستن مودال بعد از یک ثانیه
}

// بستن مودال خطا
function closeModal() {
  document.getElementById("error-modal").style.display = "none";
}

// دکمه‌های پخش و توقف
const p = document.querySelector(".play-1");
const s = document.querySelector(".stop-1");

// نمایش و مخفی‌کردن دکمه‌های پخش و توقف
p.addEventListener("click", function () {
  togglePlayStop();
  p.style.display = "none";
  s.style.display = "block";
});

s.addEventListener("click", function () {
  togglePlayStop();
  s.style.display = "none";
  p.style.display = "block";
});

// تغییر وضعیت پخش/توقف آهنگ
function togglePlayStop() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    cancelAnimationFrame(progressAnimation); // توقف به‌روزرسانی نوار پیشرفت
  } else {
    audio
      .play()
      .then(() => {
        isPlaying = true;
        updateProgress();
      })
      .catch(() => {});
  }
}
