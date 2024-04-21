import { space } from "./space.js";
import { planets } from "./planets.js";
import { miniapp } from "./miniapp.js";
import { renderView } from "./render.js";

let url = new URL(window.location.href);
let startParam = url.searchParams.get("tgWebAppStartParam");
window.currentView = startParam ? startParam.toLocaleLowerCase() : null;

space.init();
planets.init();
miniapp.init();

window.space = space;
window.planets = planets;
window.miniapp = miniapp;
window.renderView = renderView;
