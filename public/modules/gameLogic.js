export default class GameLogic {

  constructor(field) {
    this._field = field;
  }

  newGame(data) {
    let field = this._field;
    field.setSize(data.size);
    data.cells.forEach(cell => {
      field.cells.set(cell.pos, cell.value);
    });
    this._maxValue = data.maxValue;
    field.setHandler(this.onCellClick.bind(this));
    this.stepCount = 0;
  }

  onCellClick({x,y}) {
    this._incAroundCell(x,y);
    this.stepCount++;
    this.updateStepCount();
    if (this.checkFinish()) {
      alert('You win!!!');
    }
  }

  _incAroundCell(x,y) {
    for (var i = y - 1; i <= y + 1; i++) {
      for (var j = x - 1; j <= x + 1; j++) {
        if (i == y && j == x) {
          this._incCell(j, i);
        }
        this._incCell(j, i);
      }
    }
  }

  _incCell(x,y) {
    let field = this._field;
    let cell = field.getCell({x: x, y: y});
    if (cell) {
      cell.state = (cell.state + 1) % this._maxValue;
    }
  }

  checkFinish() {
    return false;
    // var prev;
    // for (var i = 0; i < h; i++) {
    //   for (var j = 0; j < w; j++) {
    //     let state = this._field.getCell({x: j, y: i});
    //     if (prev === undefined)
    //       prev = state;
    //     if (state != prev)
    //       return false;
    //   }
    // }
    // return true;
  }

  updateStepCount() {
    console.log("Hodov sdelano " + this.stepCount);
  }

}
