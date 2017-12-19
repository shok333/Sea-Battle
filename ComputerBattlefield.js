function ComputerBattlefield(game) {
    this.matrix = this.createMatrix();
    this.computerBattlefield = document.querySelector('.computer-battlefield');

    this.computerBattlefield.addEventListener('mouseover',function (event) {
        if(event.target.tagName.toUpperCase() === 'button'.toUpperCase()) {
            event.target.style.backgroundColor = 'red';
        }
    });
    this.computerBattlefield.addEventListener('mouseout', function (event) {
        event.target.style.backgroundColor = null;
    });

    this.computerBattlefield.addEventListener('click', (function (event) {
        if(!Battlefield.computerStart){
            if(event.target.tagName.toUpperCase() === 'button'.toUpperCase()){
                var x = +event.target.dataset.x - 1;
                var y = +event.target.dataset.y - 1;
                var selectedItemValue = this.matrix[x][y];
                if(selectedItemValue === 0){
                    this.matrix[x][y] = 1;
                    event.target.classList.add('blunder');
                    Battlefield.computerStart = true;
                }
                else if(selectedItemValue === 2){
                    var shipElements = [];
                    this.matrix[x][y] = 3;
                    this.findNextShipsItems.call(this, x, y, shipElements);
                    for(var i = 0; i < shipElements.length; i++){
                        if(shipElements[i].value === 2){
                            event.target.classList.toggle('ship-shooted');
                            return;
                        }
                    }
                    event.target.classList.add('ship-killed');
                    var x = +event.target.dataset.x - 1;
                    var y = +event.target.dataset.y - 1;
                    for (var i = x - 1; i <= x + 1; i++) {
                        for (var j = y - 1; j <= y + 1; j++) {
                            if (i >= 0 && j >= 0 && i <= 9 && j <= 9) {
                                if (this.matrix[i][j] !== 4) {
                                    this.matrix[i][j] = 1;
                                    this.computerBattlefield.querySelector('button[data-x="' + (i + 1) + '"][data-y="' + (j + 1) + '"]').classList.add('blunder');
                                }
                            }
                        }
                    }
                    shipElements.forEach((function (item) {
                        this.computerBattlefield.querySelector('button[data-x="'+(item.x+1)+'"][data-y="'+(item.y+1)+'"]').classList.add('ship-killed');
                        for (var i = item.x - 1; i <= item.x + 1; i++) {
                            for (var j = item.y - 1; j <= item.y + 1; j++) {
                                if (i >= 0 && j >= 0 && i <= 9 && j <= 9) {
                                    if (this.matrix[i][j] !== 4) {
                                        this.matrix[i][j] = 1;
                                        this.computerBattlefield.querySelector('button[data-x="' + (i + 1) + '"][data-y="' + (j + 1) + '"]').classList.add('blunder');
                                    }
                                }
                            }
                        }
                    }).bind(this));
                    game.subtractComputerShipsCount();
                    game.checkEndOfGame();
                    Battlefield.computerStart = true;
                }
            }
        }
    }).bind(this))

    this.addShips.call(this, this.computerBattlefield);

}

ComputerBattlefield.prototype = Object.create(Battlefield.prototype);