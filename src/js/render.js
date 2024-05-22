import { fetchView } from "./io.js";

export function renderView(viewName, style, oncomplete) {
  if (style) {
    document.querySelector("#style").href = `./css/${style}.css`;
  }

  let container = document.querySelector(".container");
  container.style.visibility = "hidden";

  const loadingPlaceholder = document.querySelector(".loading-placeholder");
  loadingPlaceholder.style.display = "block";

  fetchView(`views/${viewName}.html`)
    .then((view) => {
      const fragment = document.createRange().createContextualFragment(view);
      const images = fragment.querySelectorAll("img");
      const imagePromises = [];
      for (let img of images) {
        imagePromises.push(
          new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = resolve; // Consider image load even if there's an error
          })
        );
      }

      return Promise.all(imagePromises).then(() => fragment);
    })
    .then((fragment) => {
      container.innerHTML = "";
      container.appendChild(fragment);
    })
    .then(() => {
      if (oncomplete) {
        oncomplete();
      }
      loadingPlaceholder.style.display = "none";
      container.style.visibility = "visible";
    });
}
