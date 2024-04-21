import { fetchView } from "./io.js";

export function renderView(viewName, style, oncomplete) {
  if (style) {
    document.querySelector("#style").href = `./css/${style}.css`;
  }

  let viewUrl = `views/${viewName}.html`;
  fetchView(viewUrl)
    .then((view) => {
      let container = document.querySelector(".container");
      container.innerHTML = view;
    })
    .then(() => {
      if (oncomplete) {
        oncomplete();
      }
    });
}
