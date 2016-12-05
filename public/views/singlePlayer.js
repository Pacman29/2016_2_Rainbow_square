import View from "../modules/view"
import Block from "../components/block/block.js";
import GameField from "../components/gameField/gameField.js";
import GameLogic from "../modules/gameLogic.js";

export  default  class SinglePlayerView extends View {
  constructor(options = {}) {
    super(options);
    this._init();
    this.hide();
  }

  _init() {
    let container = document.querySelector('.content_container');
    let gameContainer = new Block('div');
    let gameField = new GameField();
    gameField.renderTo(gameContainer._get());
    gameContainer.renderTo(container);
    this._el = gameContainer._get();
    let gameInstance = new GameLogic(gameField);
    gameInstance.newGame({
      "maxValue": 3,
      "size": {"w": 4, "h": 4 },
      "cells": [],
    })
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
