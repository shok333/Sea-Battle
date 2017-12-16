function PlayerBattlefield(battlefield) {
    // Состояния матрицы:
    // 0 - свободная ячейка,
    // 1 - свободная проверенная ячейка - промах,
    // 2 - занятая ячейка
    // 3 - занятая подбитая ячейка - попадание
    shipCount = {
        1: 4,
        2: 3,
        3: 2,
        4: 1,
    }

    var shipSize=1;
    var shipPosition = 'horizontal';
    var shipTypesPanel = document.querySelector('.ship-types');
    function createMatrix() {
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
    var matrix = createMatrix();

    document.querySelector('#turn-ship').addEventListener('click', turnShip);

    function selectShipSize(event) {
        shipSize = +(event.target.dataset.size);
    }

    function turnShip() {
        if(shipPosition === 'horizontal'){
            shipPosition = 'vertical';
        }
        else {
            shipPosition = 'horizontal';
        }
    }

    shipTypesPanel.addEventListener('click',selectShipSize);

    function correctlyPlace(mousePosition) {
        if(shipPosition === 'horizontal'){
            if(shipSize > 2){
                var leftPart = mousePosition.x - 1;
                var rightPart = mousePosition.x + shipSize - 2;
                if(leftPart > 0 && rightPart <= 10){

                    return true;
                }
                console.log(leftPart+'  '+rightPart);
                return false;
            }
            else if(shipSize === 2){
                var rightPart = mousePosition.x + 1;
                if(rightPart <= 10){
                    return true;
                }
                return false;
            }
            return true;
        }
        else {
            if(shipSize > 2){
                var leftPart = mousePosition.y - 1;
                var rightPart = mousePosition.y + shipSize - 2;
                if(leftPart > 0 && rightPart <= 10){
                    return true;
                }
                return false;
            }
            else if(shipSize === 2){
                var rightPart = mousePosition.y + 1;
                if(rightPart <= 10){
                    return true;
                }
                return false;
            }
            return true;
        }
    }

    function positionIsEmpty(shipPositionElements) { //Проверяет не занята ли выбранная или соседняя ячейка
        var placeIsEmpty = true;
        shipPositionElements.forEach(function (item) {
            const x = item.x - 1;
            const y = item.y - 1;
            for ( var i = x - 1; i <= x + 1; i++){
                for( var j = y - 1; j <= y + 1; j++){
                    if(i >= 0 && j >= 0 && i <= 9 && j <= 9){
                        if(matrix[i][j] !== 0){
                            placeIsEmpty = false;
                        }
                    }
                }
            }
        });
        return placeIsEmpty;
    }

    function getShipPosition (event) {
        var mousePosition = { x: +event.target.dataset.x, y: +event.target.dataset.y };
        var correctlyPositionResponse = correctlyPlace(mousePosition);
        var shipPositionElements = [];
        var shipElement = {x: null, y: null};
        if(shipPosition === 'horizontal'){
            if(shipSize > 2){
                var leftShiftElement = {x: mousePosition.x - 1, y: mousePosition.y};
                if(0 < leftShiftElement.x){
                    shipPositionElements.push({ x:leftShiftElement.x, y: leftShiftElement.y });
                }

                for(var i = 0; i < shipSize-1; i++){
                    shipElement = {x: mousePosition.x + i, y: mousePosition.y};
                    if(shipElement.x <= 10){
                        shipPositionElements.push({ x:shipElement.x, y: shipElement.y });
                    }
                }
            }
            else {
                for(var i = 0; i < shipSize; i++){
                    shipElement = {x: mousePosition.x + i, y: mousePosition.y};
                    if(0 < shipElement.x &&shipElement.x <= 10){
                        shipPositionElements.push({ x:shipElement.x, y: shipElement.y });
                    }
                }
            }
        }
        else {
            if(shipSize > 2){
                var leftShiftElement = {x: mousePosition.x, y: mousePosition.y - 1};
                if(0 < leftShiftElement.y){
                    shipPositionElements.push({ x:leftShiftElement.x, y: leftShiftElement.y });
                }

                for(var i = 0; i < shipSize-1; i++){
                    shipElement = {x: mousePosition.x, y: mousePosition.y + i};
                    if(shipElement.y <= 10){
                        shipPositionElements.push({ x:shipElement.x, y: shipElement.y });
                    }
                }
            }
            else {
                for(var i = 0; i < shipSize; i++){
                    shipElement = {x: mousePosition.x, y: mousePosition.y + i};
                    if(0 < shipElement.y &&shipElement.y <= 10){
                        shipPositionElements.push({ x:shipElement.x, y: shipElement.y });
                    }
                }
            }
        }

        if(!positionIsEmpty(shipPositionElements)){
            correctlyPositionResponse = false;
        }

        return { shipPositionElements: shipPositionElements, correctlyPositionResponse: correctlyPositionResponse};
    }

    function selectShipPositionMouseOut (event) {
        if(event.target.tagName.toUpperCase() === 'button'.toUpperCase()) {
            var mousePosition = {x: +event.target.dataset.x, y: +event.target.dataset.y};
            if (shipPosition === 'horizontal') {
                var leftShiftElement = {x: mousePosition.x - 1, y: mousePosition.y};
                if(0 < leftShiftElement.x){
                    document.querySelector("button[data-x='"+leftShiftElement.x+"'][data-y='"+leftShiftElement.y+"']").style.backgroundColor = null;
                }

                for (var i = 0; i < shipSize; i++) {
                    shipElement = {x: mousePosition.x + i, y: mousePosition.y};
                    if(0 <= shipElement.x &&shipElement.x <= 10) {
                        document.querySelector("button[data-x='" + shipElement.x + "'][data-y='" + shipElement.y + "']").style.backgroundColor = null;
                    }
                }
            }
            else {
                var leftShiftElement = {x: mousePosition.x, y: mousePosition.y - 1};
                if(0 < leftShiftElement.y){
                    document.querySelector("button[data-x='"+leftShiftElement.x+"'][data-y='"+leftShiftElement.y+"']").style.backgroundColor = null;
                }

                for (var i = 0; i < shipSize; i++) {
                    shipElement = {x: mousePosition.x, y: mousePosition.y + i};
                    if(0 <= shipElement.y &&shipElement.y <= 10) {
                        document.querySelector("button[data-x='" + shipElement.x + "'][data-y='" + shipElement.y + "']").style.backgroundColor = null;
                    }
                }
            }
        }
    }

    function showShipOnButtlefield(shipPositionObject) {
        if(shipPositionObject.correctlyPositionResponse){
            var color = 'pink';
        }
        else {
            var color = 'red';
        }
        shipPositionObject.shipPositionElements.forEach(function (item) {
            document.querySelector("button[data-x='"+item.x+"'][data-y='"+item.y+"']").style.backgroundColor = color;
        });
    }


    function addShip(shipPositionObject) {
        if(shipPositionObject.correctlyPositionResponse){
            var placeIsEmpty = positionIsEmpty((shipPositionObject.shipPositionElements));

            if(placeIsEmpty){
                shipPositionObject.shipPositionElements.forEach(function (item) {
                    matrix[item.x - 1][item.y - 1] = 2;
                    document.querySelector("button[data-x='"+item.x+"'][data-y='"+item.y+"']").classList.add('ship-placed');
                    document.querySelector("button[data-x='"+item.x+"'][data-y='"+item.y+"']").style.backgroundColor = null;
                });

                --shipCount[shipPositionObject.shipPositionElements.length];
                disableShipTypeButtons(shipPositionObject.shipPositionElements.length);
            }
        }
    }
    
    function disableShipTypeButtons(currentShipSize) {
        if(shipCount[currentShipSize] === 0){
            document.querySelector("button[data-size='"+currentShipSize+"']").disabled = true;
            for (var key in shipCount){
                if(shipCount[key] !== 0){
                    shipSize = (+key);
                }
            }
            if(currentShipSize === shipSize){
                shipSize = 0;
            }
        }

    }
    
    battlefield.addEventListener('mouseover', function (event) {
        if(event.target.tagName.toUpperCase() === 'button'.toUpperCase()){
            var shipPositionObject = getShipPosition(event);
            showShipOnButtlefield(shipPositionObject);
        }
    });
    battlefield.addEventListener('mouseout', selectShipPositionMouseOut);
    battlefield.addEventListener('click', function (event) {
        var shipPositionObject = getShipPosition(event);
        addShip(shipPositionObject);

    });
}