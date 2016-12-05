export default class GameMPLogic {

  constructor(playerField, targetField) {
    this._field = playerField;
    this._targetField = targetField;
    this._socket = null;
  }

  connect() {
    this.disconnect();
    let socket = new WebSocket('wss://rainbow-square-backend.herokuapp.com/game');
    socket.onopen = () => {
      console.log('socket openned');
      let joinMsg = JSON.stringify({"type": "GameJoin", "content": "{}"});
      console.log(socket);
      socket.send(joinMsg);
    };
    socket.onerror = e => {
      console.log("socket error = " + e);
    };
    socket.onclose = e => {
      console.log("socket close = " + e.code);
    };
    socket.onmessage = e => {
      console.log("socket message = " + e.data);
      let data = JSON.parse(e.data);
      let type = data.type;
      let content = JSON.parse(data.content);
      this.handleMessage(type, content);
    }
    this._socket = socket;
  }

  disconnect() {
    if (this._socket) {
      this._socket.close();
      this._socket = null;
    }
  }

  handleMessage(type, content) {
    switch (type) {
      case 'ServerSnap':
        console.log('received ServerSnap');
        this.redrawFields(content);
        if (content.gameOver) {
          alert('Game over');
        }
        break;
    }
  }

  setFieldMatrix(field, matrix) {
    let h = matrix.length;
    let w = matrix[0].length;
    field.setSize({'w': w, 'h': h});
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        field.getCell({'x': j, 'y': i}).state = matrix[i][j];
      }
    }
  }

  redrawFields(data) {
    let playerMatrix = data.playerMatrix;
    let targetMatrix = data.target;
    this.setFieldMatrix(this._field, playerMatrix);
    this.setFieldMatrix(this._targetField, targetMatrix);
    this._field.setHandler(this.onCellClick.bind(this));
  }

  newGame(data) {
    this.connect();
    this.stepCount = 0;
  }

  onCellClick({x,y}) {
    let socket = this._socket;
    let message = JSON.stringify({
      "type": "PlayerAction",
      "content": JSON.stringify({
        "col": x,
        "row": y,
        "positive": true
      })
    });
    socket.send(message);
    this.stepCount++;
  }

}
