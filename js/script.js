/*
# Creator: Aryon Rabello
# GitHub: https://github.com/arriaoedu123/
# Creation date: 03/02/2023
# Version: 1.0
*/

const DOM = {
	previewDiv: document.querySelector(".preview-div"),
	formField: document.querySelector(".form-field"),
	img: document.querySelector(".thumbnail"),
	button: document.querySelector(".button"),
	input: document.querySelector("#urlField"),
}
var videoId = "";

const downloadThumbnail = (url) => {
  if (DOM.input.value) {
    fetch(url)
      .then((res) => res.blob())
      .then((file) => {
        let tempUrl = URL.createObjectURL(file);
        const aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = DOM.input.value;
        document.body.appendChild(aTag);
        aTag.click();
        URL.revokeObjectURL(tempUrl);
        aTag.remove();
        setTimeout(function () {
          window.close();
        }, 300);
      })
      .catch(() => {
        alert("Failed to download file!");
      });
  } else {
    alert("Please enter a file name!");
  }
};

const extractVideoId = (url) => {
  return url.split("v=")[1].substring(0, 11);
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  videoId = extractVideoId(tabs[0].url);
  DOM.previewDiv.classList.toggle("active", !!videoId);
  DOM.formField.classList.toggle("active", !!videoId);
  DOM.img.src = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "";
  DOM.input.value = `thumbnail-${videoId}`;
});

DOM.button.addEventListener("click", (event) => {
  event.preventDefault();
  downloadThumbnail(DOM.img.src);
});
