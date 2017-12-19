function Battlefield() {
    // Состояния матрицы:
    // 0 - свободная ячейка,
    // 1 - свободная проверенная ячейка - промах,
    // 2 - занятая ячейка
    // 3 - занятая подбитая ячейка - попадание
    // 4 - убил
}

Battlefield.prototype.createMatrix = function() {
    var matrix = [];
    for( var i = 0; i < 10; i++){
        var row = []
        for ( var j = 0; j < 10; j++){
            row.push(0);
        }
        matrix.push(row);
    }
    return matrix;
}

Battlefield.prototype.positionIsEmpty = function (shipPositionElements) { //Проверяет не занята ли выбранная или соседняя ячейка
    var placeIsEmpty = true;
    shipPositionElements.forEach((function (item) {
        const x = item.x - 1;
        const y = item.y - 1;
        for ( var i = x - 1; i <= x + 1; i++){
            for( var j = y - 1; j <= y + 1; j++){
                if(i >= 0 && j >= 0 && i <= 9 && j <= 9){
                    if(this.matrix[i][j] !== 0){
                        placeIsEmpty = false;
                    }
                }
            }
        }
    }).bind(this));
    return placeIsEmpty;
}

Battlefield.prototype.correctlyPlace = function (mousePosition) {
    if(this.shipPosition === 'horizontal'){
        if(this.shipSize > 2){
            var leftPart = mousePosition.x - 1;
            var rightPart = mousePosition.x + this.shipSize - 2;
            if(leftPart > 0 && rightPart <= 10){

                return true;
            }
            return false;
        }
        else if(this.shipSize === 2){
            var rightPart = mousePosition.x + 1;
            if(rightPart <= 10){
                return true;
            }
            return false;
        }
        return true;
    }
    else {
        if(this.shipSize > 2){
            var leftPart = mousePosition.y - 1;
            var rightPart = mousePosition.y + this.shipSize - 2;
            if(leftPart > 0 && rightPart <= 10){
                return true;
            }
            return false;
        }
        else if(this.shipSize === 2){
            var rightPart = mousePosition.y + 1;
            if(rightPart <= 10){
                return true;
            }
            return false;
        }
        return true;
    }
}

Battlefield.prototype.checkNextShipsItems = function (i, j, x, y, shipElements) {
    if(i === x && j < y){
        var index = j;
        while(this.matrix[x][index]===2 || this.matrix[x][index] === 3){
            shipElements.push({value: this.matrix[x][index], x: x, y: index});
            index--;
            if(index<0){
                break;
            }
        }
    }
    else if(i === x && j > y){
        var index = j;
        while(this.matrix[x][index]===2 || this.matrix[x][index] === 3){
            shipElements.push({value: this.matrix[x][index], x: x, y: index});
            index++;
            if(index>9){
                break;
            }
        }
    }
    else if(i < x && j === y){
        console.log(i+' '+j+ ' '+x+' '+y);
        var index = i;
        console.log(index);
        while(this.matrix[index][y]===2 || this.matrix[index][y] === 3){
            shipElements.push({value: this.matrix[index][y], x: index, y: y});
            index--;
            if(index<0){
                break;
            }
        }
    }
    else if(i > x && j === y) {
        var index = i;
        while(this.matrix[index][y]===2 || this.matrix[index][y] === 3){
            shipElements.push({value: this.matrix[index][y], x: index, y: y});
            index++;
            if(index>9){
                break;
            }
        }
    }
}

Battlefield.prototype.findNextShipsItems = function (x, y, shipElements) {
    for(var i = x - 1; i <= x + 1; i++){
        for(var j = y - 1; j <= y + 1; j++){
            if(i >= 0 && j >= 0 && i < 10 && j < 10){
                if(this.matrix[i][j] === 2 || this.matrix[i][j] === 3){
                    this.checkNextShipsItems(i, j, x, y, shipElements);
                }
            }
        }
    }
}

Battlefield.prototype.random = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

Battlefield.prototype.addShips = function (battlefield) {
    var ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    ships.forEach((function (item) {
        var shipPosirionCoordinates = this.addShip.call(this, item);
        shipPosirionCoordinates.forEach((function (item) {
            this.matrix[item.x][item.y] = item.value;
        }).bind(this));
    }).bind(this));

    //Временно:
    for (var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            if(this.matrix[i][j] !== 0){
                battlefield.querySelector('button[data-x="'+(i+1)+'"][data-y="'+(j+1)+'"]').classList.toggle('ship-placed');
            }
        }
    }
}

Battlefield.prototype.addShip = function(shipSize) {
    var uncorrectlyPositions = [];
    var positionHasFound = false;
    if(this.random(0,1)){
        var shipPosition = 'horizontal';
    }
    else {
        var shipPosition = 'vertical';
    }
    if(shipPosition === 'horizontal'){
        while (!positionHasFound){
            var response = [];
            var correctlyPosition = true;
            var x = this.random(0, 10 - shipSize);
            var y = this.random(0,9);

            uncorrectlyPositions.forEach(function (item) {
                if(item.x === x && item.y === y){
                    correctlyPosition = false;
                }
            });

            if(correctlyPosition){
                for ( var i = 0; i < shipSize; i++ ){
                    var coord = {x: x + i, y: y};
                    response.push({x: coord.x, y: coord.y, value: 2});
                    for(var j = coord.x - 1; j <= coord.x + 1; j++){
                        for(var k =  coord.y - 1; k <= coord.y + 1; k++){
                            if(j >= 0 && k >= 0 && j < 10 && k < 10){
                                if(this.matrix[j][k] !== 0){
                                    correctlyPosition = false;
                                    uncorrectlyPositions.push({x: coord.x, y: coord.y});
                                }
                            }
                        }
                    }
                }

            }

            if(!this.positionIsEmpty(response)){
                correctlyPosition = false;
            }
            if(correctlyPosition){
                positionHasFound = true
                return response;
            }
        }
    }
    else {
        while (!positionHasFound){
            var response = [];
            var correctlyPosition = true;
            var y = this.random(0, 10 - shipSize);
            var x = this.random(0,9);

            uncorrectlyPositions.forEach(function (item) {
                if(item.x === x && item.y === y){
                    correctlyPosition = false;
                }
            });

            if(correctlyPosition){
                for ( var i = 0; i < shipSize; i++ ){
                    var coord = {x: x, y: y + i};
                    response.push({x: coord.x, y: coord.y, value: 2});
                    for(var j = coord.x - 1; j <= coord.x + 1; j++){
                        for(var k =  coord.y - 1; k <= coord.y + 1; k++){
                            if(j >= 0 && k >= 0 && j < 10 && k < 10){
                                if(this.matrix[j][k] !== 0){
                                    correctlyPosition = false;
                                    uncorrectlyPositions.push({x: coord.x, y: coord.y});
                                }
                            }
                        }
                    }
                }

            }

            if(!this.positionIsEmpty(response)){
                correctlyPosition = false;
            }
            if(correctlyPosition){
                positionHasFound = true
                return response;
            }
        }
    }
}

Battlefield.computerStart = false;
Battlefield.computerShipsCount = 10;
Battlefield.playerShipsCount = 10;