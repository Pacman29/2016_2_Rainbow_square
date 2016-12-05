import View from "../modules/view"
import Menu from "../components/menu/menu"
import Button from "../components/button/button.js";
import Link from "../components/link/link.js";

export  default  class PlayChooseView extends View {
  constructor(options = {}) {
    super(options);
    this._init();
    // this.hide();
  }

  _init() {
    let container = document.querySelector('.content_container');
    this._menu = new Menu({
      data: {
        fields: [
          {
            class: 'Singleplayer'
          },
          {
            class: 'Multiplayer'
          },
        ],
        template: 'menu/menu.tmpl',
        title: 'RAINBOW SQUARE',
      }
    });
    this._el = this._menu._el;
    container.appendChild(this._menu._el);

    let play = document.querySelector('.Singleplayer');
    this._play = new Link({class: "ghost-button-rounded-corners", attrs: {text: "SINGLEPLAYER"}});
    // let multiPlayer = new Block_query('Multiplayer');
    // let scoreboard = new Block_query('Scoreboard');
    play.appendChild(this._play._el);

    this._play.on('click', event => {
      this.router.go('/singleplayer');
    });

    let leaderbord = document.querySelector('.Multiplayer');
    this._leaderbord = new Link({
      class: "ghost-button-rounded-corners",
      attrs: {text: "MULTIPLAYER"}
    });

    play.appendChild(this._leaderbord._el);

    this._leaderbord.on('click', event => {
      this.router.go('/multiPlayer');
    });


    // this._el = menu._el;
  }

  resume(options = {}) {
    let session = window.session;
    if (!session || !session.isAuthenticated) {
      this.router.go('/login');
    }
    else {
      this.show();
    }
  }
}
