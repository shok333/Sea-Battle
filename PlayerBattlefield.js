function PlayerBattlefield(game) {
    this.playerBattlefield = document.querySelector('.player-battlefield');
    this.matrix = this.createMatrix();

    this.addShips.call(this, this.playerBattlefield);

    this.shootedElements = [];
    this.startGame = (function () {
        setInterval((function () {
            if(Battlefield.computerStart) {
                if (this.shootedElements.length > 0) {
                    if (this.shootedElements.length === 1) {
                        var siblingElements = [];
                        var x = this.shootedElements[0].x;
                        var y = this.shootedElements[0].y;
                        if (x + 1 < 10) {
                            if (this.matrix[x + 1][y] === 0 || this.matrix[x + 1][y] === 2) {
                                siblingElements.push({x: x + 1, y: y});
                            }
                        }
                        if (x - 1 >= 0) {
                            if (this.matrix[x - 1][y] === 0 || this.matrix[x - 1][y] === 2) {
                                siblingElements.push({x: x - 1, y: y});
                            }
                        }
                        if (y + 1 < 10) {
                            if (this.matrix[x][y + 1] === 0 || this.matrix[x][y + 1] === 2) {
                                siblingElements.push({x: x, y: y + 1});
                            }
                        }
                        if (y - 1 >= 0) {
                            if (this.matrix[x][y - 1] === 0 || this.matrix[x][y - 1] === 2) {
                                siblingElements.push({x: x, y: y - 1});
                            }
                        }
                        var selectedItem = siblingElements[this.random(0, siblingElements.length - 1)];

                        if (this.matrix[selectedItem.x][selectedItem.y] === 2) {

                            var shipElements = [];
                            this.findNextShipsItems.call(this, selectedItem.x, selectedItem.y, shipElements);
                            shipElements = shipElements.filter((function (item) {
                                if (this.matrix[item.x][item.y] === 2) {
                                    return true;
                                }
                                return false;
                            }).bind(this));


                            if (shipElements.length === 1) {
                                this.matrix[selectedItem.x][selectedItem.y] = 4;
                                this.matrix[x][y] = 4;
                                this.playerBattlefield.querySelector('button[data-x="' + (selectedItem.x + 1) + '"][data-y="' + (selectedItem.y + 1) + '"]').classList.add('ship-killed');
                                this.playerBattlefield.querySelector('button[data-x="' + (x + 1) + '"][data-y="' + (y + 1) + '"]').classList.add('ship-killed');

                                for (var i = selectedItem.x - 1; i <= selectedItem.x + 1; i++) {
                                    for (var j = selectedItem.y - 1; j <= selectedItem.y + 1; j++) {
                                        if (i >= 0 && j >= 0 && i <= 9 && j <= 9) {
                                            if (this.matrix[i][j] !== 4) {
                                                this.matrix[i][j] = 1;
                                                this.playerBattlefield.querySelector('button[data-x="' + (i + 1) + '"][data-y="' + (j + 1) + '"]').classList.add('blunder');
                                            }
                                        }
                                    }
                                }
                                for (var i = x - 1; i <= x + 1; i++) {
                                    for (var j = y - 1; j <= y + 1; j++) {
                                        if (i >= 0 && j >= 0 && i <= 9 && j <= 9) {
                                            if (this.matrix[i][j] !== 4) {
                                                this.matrix[i][j] = 1;
                                                this.playerBattlefield.querySelector('button[data-x="' + (i + 1) + '"][data-y="' + (j + 1) + '"]').classList.add('blunder');
                                            }
                                        }
                                    }
                                }

                                this.shootedElements = [];
                                game.subtractPlayerShipsCount();
                                game.checkEndOfGame();
                                Battlefield.computerStart = false;
                                return;
                            }
                            else {
                                this.shootedElements.push(selectedItem);
                                this.playerBattlefield.querySelector('button[data-x="' + (selectedItem.x + 1) + '"][data-y="' + (selectedItem.y + 1) + '"]').classList.add('ship-shooted');
                                return;
                            }
                        }
                        else {
                            this.playerBattlefield.querySelector('button[data-x="' + (selectedItem.x + 1) + '"][data-y="' + (selectedItem.y + 1) + '"]').classList.add('blunder');
                            this.matrix[selectedItem.x][selectedItem.y] = 1;
                            Battlefield.computerStart = false;
                            return;
                        }
                    }
                    else {
                        var siblingElementsArray = [];
                        if (this.shootedElements[0].x > this.shootedElements[this.shootedElements.length - 1].x) {
                            var xMax = this.shootedElements[0].x;
                            var xMin = this.shootedElements[this.shootedElements.length - 1].x;
                            var yMax = this.shootedElements[0].y;
                            var yMin = this.shootedElements[this.shootedElements.length - 1].y;

                            if (xMax + 1 < 10) {
                                if (this.matrix[xMax + 1][yMax] === 0 || this.matrix[xMax + 1][yMax] === 2) {
                                    siblingElementsArray.push({x: xMax + 1, y: yMax});
                                }
                            }
                            if (xMin - 1 >= 0) {
                                if (this.matrix[xMin - 1][yMin] === 0 || this.matrix[xMin - 1][yMin] === 2) {
                                    siblingElementsArray.push({x: xMin - 1, y: yMin});
                                }
                            }
                        }
                        else if (this.shootedElements[0].y > this.shootedElements[this.shootedElements.length - 1].y) {
                            var yMax = this.shootedElements[0].y;
                            var yMin = this.shootedElements[this.shootedElements.length - 1].y;
                            var xMax = this.shootedElements[0].x;
                            var xMin = this.shootedElements[this.shootedElements.length - 1].x;

                            if (yMax + 1 < 10) {
                                if (this.matrix[xMax][yMax + 1] === 0 || this.matrix[xMax][yMax + 1] === 2) {
                                    siblingElementsArray.push({x: xMax, y: yMax + 1});
                                }
                            }
                            if (yMin - 1 >= 0) {
                                if (this.matrix[xMin][yMin - 1] === 0 || this.matrix[xMin][yMin - 1] === 2) {
                                    siblingElementsArray.push({x: xMin, y: yMin - 1});
                                }
                            }
                        }
                        else if (this.shootedElements[0].x < this.shootedElements[this.shootedElements.length - 1].x) {
                            var xMin = this.shootedElements[0].x;
                            var xMax = this.shootedElements[this.shootedElements.length - 1].x;
                            var yMin = this.shootedElements[0].y;
                            var yMax = this.shootedElements[this.shootedElements.length - 1].y;

                            if (xMax + 1 < 10) {
                                if (this.matrix[xMax + 1][yMax] === 0 || this.matrix[xMax + 1][yMax] === 2) {
                                    siblingElementsArray.push({x: xMax + 1, y: yMax});
                                }
                            }
                            if (xMin - 1 >= 0) {
                                if (this.matrix[xMin - 1][yMin] === 0 || this.matrix[xMin - 1][yMin] === 2) {
                                    siblingElementsArray.push({x: xMin - 1, y: yMin});
                                }
                            }
                        }
                        else if (this.shootedElements[0].y < this.shootedElements[this.shootedElements.length - 1].y) {
                            var yMin = this.shootedElements[0].y;
                            var yMax = this.shootedElements[this.shootedElements.length - 1].y;
                            var xMin = this.shootedElements[0].x;
                            var xMax = this.shootedElements[this.shootedElements.length - 1].x;

                            if (yMax + 1 < 10) {
                                if (this.matrix[xMax][yMax + 1] === 0 || this.matrix[xMax][yMax + 1] === 2) {
                                    siblingElementsArray.push({x: xMax, y: yMax + 1});
                                }
                            }
                            if (yMin - 1 >= 0) {
                                if (this.matrix[xMin][yMin - 1] === 0 || this.matrix[xMin][yMin - 1] === 2) {
                                    siblingElementsArray.push({x: xMin, y: yMin - 1});
                                }
                            }
                        }
                        if (siblingElementsArray.length === 1) {
                            this.playerBattlefield.querySelector('button[data-x="' + (siblingElementsArray[0].x + 1) + '"][data-y="' + (siblingElementsArray[0].y + 1) + '"]').classList.add('ship-killed');
                            this.matrix[siblingElementsArray[0].x][siblingElementsArray[0].y] = 4;
                            this.shootedElements = [];
                            var nextShipItems = [];
                            this.findNextShipsItems(siblingElementsArray[0].x, siblingElementsArray[0].y, nextShipItems);

                            for (var i = siblingElementsArray[0].x - 1; i <= siblingElementsArray[0].x + 1; i++) {
                                for (var j = siblingElementsArray[0].y - 1; j <= siblingElementsArray[0].y + 1; j++) {
                                    if (i >= 0 && j >= 0 && i <= 9 && j <= 9) {
                                        this.matrix[i][j] = 1;
                                        this.playerBattlefield.querySelector('button[data-x="' + (i + 1) + '"][data-y="' + (j + 1) + '"]').classList.add('blunder');
                                    }
                                }
                            }

                            nextShipItems.forEach((function (item) {
                                this.matrix[item.x][item.y] = 4;
                                this.playerBattlefield.querySelector('button[data-x="' + (item.x + 1) + '"][data-y="' + (item.y + 1) + '"]').classList.add('ship-killed');
                                for (var i = item.x - 1; i <= item.x + 1; i++) {
                                    for (var j = item.y - 1; j <= item.y + 1; j++) {
                                        if (i >= 0 && j >= 0 && i <= 9 && j <= 9) {
                                            this.matrix[i][j] = 1;
                                            this.playerBattlefield.querySelector('button[data-x="' + (i + 1) + '"][data-y="' + (j + 1) + '"]').classList.add('blunder');
                                        }
                                    }
                                }
                            }).bind(this));
                            game.subtractPlayerShipsCount();
                            game.checkEndOfGame();
                            Battlefield.computerStart = false;
                            return;
                        }
                        else if (siblingElementsArray.length === 2) {
                            if (this.random(0, 1) === 0) {
                                if (this.matrix[siblingElementsArray[0].x][siblingElementsArray[0].y] === 2) {
                                    this.playerBattlefield.querySelector('button[data-x="' + (siblingElementsArray[0].x + 1) + '"][data-y="' + (siblingElementsArray[0].y + 1) + '"]').classList.add('ship-killed');
                                    this.matrix[siblingElementsArray[0].x][siblingElementsArray[0].y] = 3;
                                    this.shootedElements = [];
                                    var nextShipItems = [];
                                    this.findNextShipsItems(siblingElementsArray[0].x, siblingElementsArray[0].y, nextShipItems);

                                    for (var i = siblingElementsArray[0].x - 1; i <= siblingElementsArray[0].x + 1; i++) {
                                        for (var j = siblingElementsArray[0].y - 1; j <= siblingElementsArray[0].y + 1; j++) {
                                            if (i >= 0 && j >= 0 && i <= 9 && j <= 9) {
                                                this.matrix[i][j] = 1;
                                                this.playerBattlefield.querySelector('button[data-x="' + (i + 1) + '"][data-y="' + (j + 1) + '"]').classList.add('blunder');
                                            }
                                        }
                                    }

                                    nextShipItems.forEach((function (item) {
                                        this.matrix[item.x][item.y] = 4;
                                        this.playerBattlefield.querySelector('button[data-x="' + (item.x + 1) + '"][data-y="' + (item.y + 1) + '"]').classList.add('ship-killed');
                                        for (var i = item.x - 1; i <= item.x + 1; i++) {
                                            for (var j = item.y - 1; j <= item.y + 1; j++) {
                                                if (i >= 0 && j >= 0 && i <= 9 && j <= 9) {
                                                    this.matrix[i][j] = 1;
                                                    this.playerBattlefield.querySelector('button[data-x="' + (i + 1) + '"][data-y="' + (j + 1) + '"]').classList.add('blunder');
                                                }
                                            }
                                        }
                                    }).bind(this));
                                    game.subtractPlayerShipsCount();
                                    game.checkEndOfGame();
                                    Battlefield.computerStart = false;
                                    return;
                                }
                                else {
                                    this.playerBattlefield.querySelector('button[data-x="' + (siblingElementsArray[0].x + 1) + '"][data-y="' + (siblingElementsArray[0].y + 1) + '"]').classList.add('blunder');
                                    this.matrix[siblingElementsArray[0].x][siblingElementsArray[0].y] = 1;
                                    Battlefield.computerStart = false;
                                    return;
                                }
                            }
                            else {
                                if (this.matrix[siblingElementsArray[1].x][siblingElementsArray[1].y] === 2) {
                                    this.playerBattlefield.querySelector('button[data-x="' + (siblingElementsArray[1].x + 1) + '"][data-y="' + (siblingElementsArray[1].y + 1) + '"]').classList.add('ship-killed');
                                    this.matrix[siblingElementsArray[1].x][siblingElementsArray[1].y] = 3;
                                    this.shootedElements = [];
                                    var nextShipItems = [];
                                    this.findNextShipsItems(siblingElementsArray[1].x, siblingElementsArray[1].y, nextShipItems);

                                    for (var i = siblingElementsArray[1].x - 1; i <= siblingElementsArray[1].x + 1; i++) {
                                        for (var j = siblingElementsArray[1].y - 1; j <= siblingElementsArray[1].y + 1; j++) {
                                            if (i >= 0 && j >= 0 && i <= 9 && j <= 9) {
                                                this.matrix[i][j] = 1;
                                                this.playerBattlefield.querySelector('button[data-x="' + (i + 1) + '"][data-y="' + (j + 1) + '"]').classList.add('blunder');
                                            }
                                        }
                                    }

                                    nextShipItems.forEach((function (item) {
                                        this.matrix[item.x][item.y] = 4;
                                        this.playerBattlefield.querySelector('button[data-x="' + (item.x + 1) + '"][data-y="' + (item.y + 1) + '"]').classList.add('ship-killed');
                                        for (var i = item.x - 1; i <= item.x + 1; i++) {
                                            for (var j = item.y - 1; j <= item.y + 1; j++) {
                                                if (i >= 0 && j >= 0 && i <= 9 && j <= 9) {
                                                    this.matrix[i][j] = 1;
                                                    this.playerBattlefield.querySelector('button[data-x="' + (i + 1) + '"][data-y="' + (j + 1) + '"]').classList.add('blunder');
                                                }
                                            }
                                        }
                                    }).bind(this));
                                    game.subtractPlayerShipsCount();
                                    game.checkEndOfGame();
                                    Battlefield.computerStart = false;
                                    return;
                                }
                                else {
                                    this.playerBattlefield.querySelector('button[data-x="' + (siblingElementsArray[1].x + 1) + '"][data-y="' + (siblingElementsArray[1].y + 1) + '"]').classList.add('blunder');
                                    this.matrix[siblingElementsArray[1].x][siblingElementsArray[1].y] = 1;
                                    Battlefield.computerStart = false;
                                    return;
                                }
                            }
                        }
                    }
                }


                var elementForSelect = [];
                for (var i = 0; i < 10; i++) {
                    for (var j = 0; j < 10; j++) {
                        if (this.matrix[i][j] !== 1 && this.matrix[i][j] !== 3 && this.matrix[i][j] !== 4) {
                            elementForSelect.push({x: i, y: j});
                        }
                    }
                }
                var item = elementForSelect[this.random(0, elementForSelect.length - 1)];
                if (this.matrix[item.x][item.y] === 0) {
                    this.matrix[item.x][item.y] = 1;
                    this.playerBattlefield.querySelector('button[data-x="' + (item.x + 1) + '"][data-y="' + (item.y + 1) + '"]').classList.add('blunder');
                    Battlefield.computerStart = false;
                }
                else {
                    var shipElements = []
                    this.findNextShipsItems.call(this, item.x, item.y, shipElements);
                    if (shipElements.length === 0) {
                        this.matrix[item.x][item.y] = 4;
                        this.playerBattlefield.querySelector('button[data-x="' + (item.x + 1) + '"][data-y="' + (item.y + 1) + '"]').classList.add('ship-killed');
                        for (var i = item.x - 1; i <= item.x + 1; i++) {
                            for (var j = item.y - 1; j <= item.y + 1; j++) {
                                if (i >= 0 && j >= 0 && i <= 9 && j <= 9) {
                                    this.matrix[i][j] = 1;
                                    this.playerBattlefield.querySelector('button[data-x="' + (i + 1) + '"][data-y="' + (j + 1) + '"]').classList.add('blunder');
                                }
                            }
                        }
                        game.subtractPlayerShipsCount();
                        game.checkEndOfGame();
                        Battlefield.computerStart = false;
                    }
                    else {
                        this.shootedElements.push(item);
                        this.playerBattlefield.querySelector('button[data-x="' + (item.x + 1) + '"][data-y="' + (item.y + 1) + '"]').classList.add('ship-shooted');
                    }

                }
            }
        }).bind(this),100);

    }).bind(this);
}
PlayerBattlefield.prototype = Object.create(Battlefield.prototype);