import { space } from "./space.js";

export let planets = {
  init() {
    planets.activeplanet = null;
    planets.activeplanetName = window.currentView;
    planets.setColorTuple();
  },

  toggleActive(event) {
    let planet = event.currentTarget;
    if (planets.activeplanet) {
      planets.activeplanet.classList.remove("active");
      planets.activeplanet.style.boxShadow = "";
    }

    if (planets.activeplanet !== planet) {
      const planetColor = getComputedStyle(planet).backgroundColor;
      planet.style.boxShadow = `0 0 20px ${planetColor}`;

      planet.classList.add("active");
      planets.activeplanet = planet;
      planets.activeplanetName = planet.innerText.toLowerCase();

      Telegram.WebApp.MainButton.enable().show();

      planets.setColorTuple();
    } else {
      planet.style.boxShadow = ""; // Reset box shadow
      planets.activeplanet = null;
      planets.activeplanetName = null;

      Telegram.WebApp.MainButton.disable();
    }
  },

  handlersOn() {
    document.querySelectorAll(".planet").forEach((planet) => {
      planet.addEventListener("click", planets.toggleActive);
    });

    document.querySelectorAll(".planet").forEach((planet) => {
      planet.addEventListener("click", () => {
        space.speedUpUntile = Date.now() + 1000;
        space.colorStars = getComputedStyle(planet).backgroundColor;
      });
    });
  },

  setColorTuple() {
    document.documentElement.style.setProperty(
      "--selected-planet-color-tuple",
      planets.colorTuples[planets.activeplanetName]
    );
  },

  colorTuples: {
    mercury: "169, 152, 120",
    venus: "224, 185, 117",
    earth: "78, 123, 178",
    neptune: "92, 127, 194",
    mars: "209, 102, 102",
    uranus: "159, 216, 224",
    saturn: "226, 204, 155",
    jupiter: "180, 143, 104",
    sun: "243, 156, 18",
  },
};
