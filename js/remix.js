// Create cards for songs and remixes
function createCards(data, containerId) {
  const container = document.getElementById(containerId);
  // container.innerHTML = ""; // Clear existing cards before adding new ones
  data.forEach((item) =>
    container.insertAdjacentHTML("beforeend", CreateSongAndRemixHtml(item))
  );
}

// Load and create songs based on selected IDs
const loadAndCreateSongs = async () => {
  const filePath = "/data/song.json";
  const selectedIds = [1, 2, 3, 4]; // Set selected IDs here
  const containerId = "song-list"; // Set container ID here

  try {
    const response = await fetch(filePath);
    const data = await response.json();

    // Collect all songs from all artists and filter by selected IDs
    const items = Object.values(data)
      .flatMap((singer) => singer.songs)
      .filter((song) => selectedIds.includes(song.id)); // Ensure correct matching

    createCards(items, containerId);
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
};

// Invoke the function to load songs
loadAndCreateSongs();

// Load remix data
fetch("/data/remixes.json")
  .then((response) => response.json())
  .then((data) => createCards(data.remixes, "remixes-list"))
  .catch((error) => console.error("Error loading remixes:", error));
