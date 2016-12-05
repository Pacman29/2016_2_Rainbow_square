import Block from "../block/block.js";

export default class GameFieldCell extends Block {
  constructor(options = {}) {
    super('div', options);
    this._el.classList.add('gameFieldCell');
    this.state = 0;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    function stateName(state) {
      return "gameFieldCell_" + state;
    }
    var el = this._el;
    el.classList.remove(stateName(this._state));
    this._state = value;
    el.classList.add(stateName(this._state));
  }
}
