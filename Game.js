function Game() {
    this.computerStart = false;
    this.computerShipsCount = 10;
    this.playerShipsCount = 10;
    this.playerName = 'John';
}

Game.prototype.checkEndOfGame = function () {
    if(this.computerShipsCount === 0 || this.playerShipsCount === 0){
        var winPanel = document.querySelector('#win-panel');
        winPanel.querySelector('button').onclick = function () {
            winPanel.style.display = 'none';
            document.querySelector("#start-menu").style.display = 'flex';
        };
        winPanel.style.display = 'flex';
        if(this.computerShipsCount === 0){
            this.computerStart = false;
            winPanel.querySelector('h2').innerHTML = this.playerName + ' win.'
        }
        else {
            this.computerStart = false;
            winPanel.querySelector('h2').innerHTML = this.playerName = 'Computer win.'
        }
    }
};

Game.prototype.subtractComputerShipsCount = function () {
    -- this.computerShipsCount;
};

Game.prototype.subtractPlayerShipsCount = function () {
    -- this.playerShipsCount;
};

Game.prototype.addPlayerName = function (name) {
    this.playerName = name;
};

Game.prototype.setComputerStart = function (value) {
    this.computerStart = value;
};

Game.prototype.addEventListenerForStartGame = function () {
    document.querySelector('#hide-menu-and-start-game').onclick = (function () {
        var playerBattlefield = new PlayerBattlefield(this);
        var computerBattlefield = new ComputerBattlefield(this);
        if(document.querySelector("#computer-radio-button").checked){
            this.setComputerStart(true);
        }
        document.querySelector("#start-menu").style.display = 'none';
        playerBattlefield.startGame();
    }).bind(this);
};