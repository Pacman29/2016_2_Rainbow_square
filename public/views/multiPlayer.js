import View from "../modules/view"
import Block from "../components/block/block.js";
import GameField from "../components/gameField/gameField.js";
import GameMPLogic from "../modules/gameMPLogic.js";


export  default  class MultiPlayerView extends View {
  constructor(options = {}) {
    super(options);
    this._init();
    this.hide();
  }

  _init() {
    let container = document.querySelector('.content_container');
    let gameContainer = new Block('div');
    let playerField = new GameField();
    let targetField = new GameField();
    playerField.renderTo(gameContainer._get());
    targetField.renderTo(gameContainer._get());
    gameContainer.renderTo(container);
    this._el = gameContainer._get();
    let gameInstance = new GameMPLogic(playerField, targetField);
    gameInstance.newGame();
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
