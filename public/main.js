'use strict';

import Router from "./modules/router.js"
import MainMenuView from "./views/mainMenu.js"
import RedirectToMainMenu from "./views/redirectToMainMenu.js"
import LoginView from "./views/login.js"
import SinglePlayerView from "./views/singlePlayer.js"
import MultiPlayerView from "./views/multiPlayer.js"
import RegisterView from  "./views/register"
import PlayChooseView from "./views/playchoose"
import ScoreBoardView from "./views/scoreboard"
import  Session from  "./models/session"

window.onload = function () {
  let routerConfig = function () {
    (new Router)
        .addRoute('/scores', ScoreBoardView)
        .addRoute('/playchoose', PlayChooseView)
        .addRoute('/play', MainMenuView)
        .addRoute('/register', RegisterView)
        .addRoute('/singlePlayer', SinglePlayerView)
        .addRoute('/login', LoginView)
        .addRoute('/multiPlayer', MultiPlayerView)
        .addRoute('/', RedirectToMainMenu)
        .start();
  }

  if (!!localStorage.userinfo) {
    window.session = new Session(JSON.parse(localStorage.userinfo));
    window.session.save().then(routerConfig);
  }
  else {
    window.session = new Session();
    routerConfig();
  }
}
