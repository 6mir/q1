// StarT main-1
fetch("/data/artic.json")
  .then((response) => response.json())
  .then((data) => {
    const idsToSelect = ["hichkas", "yas", "tomaj", "najafi"];
    const selectedData = [];

    idsToSelect.forEach((id) => {
      const item = data.artic.find((item) => item.id === id);
      if (item) {
        selectedData.push(item);
      }
    });

    selectedData.forEach(({ image, title, id }) => {
      const songList = document.getElementById("allartic");
      const songCard = document.createElement("div");
      songCard.className = "item";
      songCard.innerHTML = CreateArticHtml(image, title, id);
      songList.appendChild(songCard);
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
// EnD main-1
