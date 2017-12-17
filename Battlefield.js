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