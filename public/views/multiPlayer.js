import View from "../modules/view"
import Menu from "../components/menu/menu"
import Button from "../components/button/button.js";
import Link from "../components/link/link.js";

export  default  class MultiPlayerView  {
  constructor(options = {}) {
    this._init();
    this.hide();
  }

  _init() {
    let container = document.querySelector('.content_container');
    this._menu = new Menu({
      data: {
        fields: [
          {
            class: 'play'
          },
          {
            class: 'leaderbord'
          },
          {
            class: 'exit'
          }
        ],
        template: 'menu/menu.tmpl',
        title: 'RAINBOW SQUARE',
      }
    });
    this._el = this._menu._el;
    container.appendChild(this._menu._el);

    let play = document.querySelector('.play');
    this._play = new Link({class: "ghost-button-rounded-corners", attrs: {text: "play"}});
    play.appendChild(this._play._el);

    this._play.on('click', event => {
      this.router.go('/playchoose');
    });

    let leaderbord = document.querySelector('.leaderbord');
    this._leaderbord = new Link({
      class: "ghost-button-rounded-corners",
      attrs: {text: "leaderbord"}
    });

    play.appendChild(this._leaderbord._el);

    this._leaderbord.on('click', event => {
      this.router.go('/scores');
    });

    let exit = document.querySelector('.exit');
    this._exit = new Link({class: "ghost-button-rounded-corners", attrs: {text: "exit"}});
    this._exit .on('click', event => {
      window.session.remove().then(() => {
        this.router.go('/');
      });
    });
    exit.appendChild(this._exit._el);

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
