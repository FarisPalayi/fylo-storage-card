const progressBarContainer = document.getElementsByClassName("progress-bar-container")[0];
const progressBar = document.getElementsByClassName("progress")[0];
const used = document.getElementsByClassName("used")[0];
const left = document.getElementsByClassName("space-left-number")[0];
const total = document.getElementsByClassName("total-storage")[0];

function getData() {
  fetch("https://fylo-data-storage-card.herokuapp.com/getStorage" || "http://localhost:3000/getStorage")
    .then((res) => res.json())
    .then((data) => {
      progressBar.setAttribute("max", data.total);
      progressBar.setAttribute("value", data.used);

      total.innerText = `${data.total} GB`;
      used.innerText = `${data.used} GB`;
      left.innerText = data.left;
      console.log(data);

      progressBarContainer.style.setProperty("--total-space", data.total);
      progressBarContainer.style.setProperty("--used-space", data.used);
      progressBarContainer.style.setProperty("--available-space", data.left);
    })
    .catch((err) => {
      console.error(err);
    });
}
getData();
