import { renderView } from "./render.js";
import { planets } from "./planets.js";
import { space } from "./space.js";

export let miniapp = {
  init() {
    Telegram.WebApp.ready();
    Telegram.WebApp.setHeaderColor("#000");

    miniapp.callbacks = {
      mainButtonClicked: {
        main: function () {
          miniapp.detailPage();
        },

        secon: function () {
          Telegram.WebView.postEvent("web_app_switch_inline_query", false, {
            query: planets.activeplanetName,
            chat_types: ["users", "groups", "channels"],
          });
        },
      },

      backButtonClicked: {
        main: function () {
          miniapp.frontPage();
        },
      },
    };

    if (window.currentView) {
      miniapp.detailPage();
    } else {
      miniapp.frontPage();
    }
  },

  frontPage() {
    space.startAnimation();
    window.removeEventListener("scroll", space.update);

    renderView("planets", "front", planets.handlersOn);

    Telegram.WebApp.MainButton.setParams({
      text: "Let's go!",
      color: "#1c1c1e",
      is_active: false,
      is_visible: true,
    });

    miniapp.updateCallback("mainButtonClicked", "main", "secon");
    Telegram.WebApp.BackButton.hide();
  },

  detailPage() {
    space.colorStars = `rgb(${planets.colorTuples[planets.activeplanetName]})`;
    space.stopAnimation();
    space.update();

    renderView(planets.activeplanetName, "detail");

    Telegram.WebApp.MainButton.setText("Share");

    setTimeout(() => {
      miniapp.updateCallback("mainButtonClicked", "secon", "main");
    }, 0); //deferred execution

    miniapp.updateCallback("backButtonClicked", "main");
    Telegram.WebApp.BackButton.show();

    window.addEventListener("scroll", space.update);
    // window.addEventListener("scrollend", space.stopAnimation);
  },

  updateCallback(eventType, newCallbackIndex, oldCallbackIndex) {
    if (oldCallbackIndex) {
      Telegram.WebApp.offEvent(
        eventType,
        miniapp.callbacks[eventType][oldCallbackIndex]
      );
    }
    Telegram.WebApp.onEvent(
      eventType,
      miniapp.callbacks[eventType][newCallbackIndex]
    );
  },
};
