function PlayerBattlefield(battlefield) {
    this.shipCount = {
        1: 4,
        2: 3,
        3: 2,
        4: 1,
    };

    var shipTypesPanel = document.querySelector('.ship-types');


    this.matrix = this.createMatrix();
    this.shootedElements = [];
    document.querySelector('#start-game').addEventListener('click', (function () {
        setInterval((function () {
            if(this.shootedElements.length > 0){
                if(this.shootedElements.length === 1){
                    var siblingElements = [];
                    var x = this.shootedElements[0].x;
                    var y = this.shootedElements[0].y;
                    if(x + 1 < 10){
                        if(this.matrix[x + 1][y] === 0 || this.matrix[x + 1][y] === 2){
                            siblingElements.push({x: x + 1, y: y});
                        }
                    }
                    if(x - 1 >= 0){
                        if(this.matrix[x - 1][y] === 0 || this.matrix[x - 1][y] === 2){
                            siblingElements.push({x: x - 1, y: y});
                        }
                    }
                    if(x + 1 < 10){
                        if(this.matrix[x][y + 1] === 0 || this.matrix[x][y + 1] === 2){
                            siblingElements.push({x: x, y: y + 1});
                        }
                    }
                    if(x - 1 >= 0){
                        if(this.matrix[x][y - 1] === 0 || this.matrix[x][y - 1] === 2){
                            siblingElements.push({x: x, y: y - 1});
                        }
                    }
                    console.log(siblingElements);
                    var selectedItem = siblingElements[this.random(0, siblingElements.length - 1)];

                    if(this.matrix[selectedItem.x][selectedItem.y] === 2){

                        var shipElements = [];
                        this.findNextShipsItems.call(this, selectedItem.x, selectedItem.y, shipElements);
                        shipElements = shipElements.filter((function (item) {
                            if(this.matrix[item.x][item.y] === 2){
                                return true;
                            }
                            return false;
                        }).bind(this));


                        if(shipElements.length === 1){
                            this.matrix[selectedItem.x][selectedItem.y] = 4;
                            this.matrix[x][y] = 4;
                            battlefield.querySelector('button[data-x="'+(selectedItem.x+1)+'"][data-y="'+(selectedItem.y+1)+'"]').classList.add('ship-killed');
                            battlefield.querySelector('button[data-x="'+(x+1)+'"][data-y="'+(y+1)+'"]').classLgiyist.add('ship-killed');

                            for ( var i = selectedItem.x - 1; i <= selectedItem.x + 1; i++) {
                                for (var j = selectedItem.y - 1; j <= selectedItem.y + 1; j++) {
                                    if (i >= 0 && j >= 0 && i <= 9 && j <= 9) {
                                        if(this.matrix[i][j] !== 4){
                                            this.matrix[i][j] = 1;
                                            battlefield.querySelector('button[data-x="'+(i+1)+'"][data-y="'+(j+1)+'"]').classList.add('blunder');
                                        }
                                    }
                                }
                            }
                            for ( var i = x - 1; i <= x + 1; i++) {
                                for (var j = y - 1; j <= y + 1; j++) {
                                    if (i >= 0 && j >= 0 && i <= 9 && j <= 9) {
                                        if(this.matrix[i][j] !== 4){
                                            this.matrix[i][j] = 1;
                                            battlefield.querySelector('button[data-x="'+(i+1)+'"][data-y="'+(j+1)+'"]').classList.add('blunder');
                                        }
                                    }
                                }
                            }

                            this.shootedElements = [];
                            return;
                        }
                        else {
                            this.shootedElements.push(selectedItem);
                            battlefield.querySelector('button[data-x="'+(selectedItem.x+1)+'"][data-y="'+(selectedItem.y+1)+'"]').classList.add('ship-shooted');
                            return;
                        }
                    }
                    else {
                        battlefield.querySelector('button[data-x="'+(selectedItem.x+1)+'"][data-y="'+(selectedItem.y+1)+'"]').classList.add('blunder');
                        this.matrix[selectedItem.x][selectedItem.y] = 1;
                        return;
                    }
                }
                else {
                    console.log('else');
                }
            }


            var elementForSelect = [];
            for(var i = 0; i < 10; i++){
                for(var j = 0; j < 10; j++){
                    if(this.matrix[i][j] !== 1 && this.matrix[i][j] !== 3 && this.matrix[i][j] !== 4){
                        elementForSelect.push({x: i, y: j});
                    }
                }
            }
            var item = elementForSelect[this.random(0,elementForSelect.length -1)];
            if(this.matrix[item.x][item.y] === 0){
                this.matrix[item.x][item.y] = 1;
                battlefield.querySelector('button[data-x="'+(item.x+1)+'"][data-y="'+(item.y+1)+'"]').classList.add('blunder');
            }
            else {
                var shipElements = []
                this.findNextShipsItems.call(this, item.x, item.y, shipElements);
                if(shipElements.length === 0){
                    this.matrix[item.x][item.y] = 4;
                    battlefield.querySelector('button[data-x="'+(item.x+1)+'"][data-y="'+(item.y+1)+'"]').classList.add('ship-killed');
                    for ( var i = item.x - 1; i <= item.x + 1; i++) {
                        for (var j = item.y - 1; j <= item.y + 1; j++) {
                            if (i >= 0 && j >= 0 && i <= 9 && j <= 9) {
                                console.log(2);
                                this.matrix[i][j] = 1;
                                battlefield.querySelector('button[data-x="'+(i+1)+'"][data-y="'+(j+1)+'"]').classList.add('blunder');
                            }
                        }
                    }
                }
                else {
                    this.shootedElements.push(item);
                    battlefield.querySelector('button[data-x="'+(item.x+1)+'"][data-y="'+(item.y+1)+'"]').classList.add('ship-shooted');
                }

            }
        }).bind(this),500);
    }).bind(this));




    document.querySelector('#turn-ship').addEventListener('click', turnShip.bind(this));

    function selectShipSize(event) {
        this.shipSize = +(event.target.dataset.size);
    }

    function turnShip() {
        if(this.shipPosition === 'horizontal'){
            this.shipPosition = 'vertical';
        }
        else {
            this.shipPosition = 'horizontal';
        }
    }

    shipTypesPanel.addEventListener('click',selectShipSize.bind(this));



    function getShipPosition (event) {
        var mousePosition = { x: +event.target.dataset.x, y: +event.target.dataset.y };
        var correctlyPositionResponse = this.correctlyPlace(mousePosition);
        var shipPositionElements = [];
        var shipElement = {x: null, y: null};
        if(this.shipPosition === 'horizontal'){
            if(this.shipSize > 2){
                var leftShiftElement = {x: mousePosition.x - 1, y: mousePosition.y};
                if(0 < leftShiftElement.x){
                    shipPositionElements.push({ x:leftShiftElement.x, y: leftShiftElement.y });
                }

                for(var i = 0; i < this.shipSize-1; i++){
                    shipElement = {x: mousePosition.x + i, y: mousePosition.y};
                    if(shipElement.x <= 10){
                        shipPositionElements.push({ x:shipElement.x, y: shipElement.y });
                    }
                }
            }
            else {
                for(var i = 0; i < this.shipSize; i++){
                    shipElement = {x: mousePosition.x + i, y: mousePosition.y};
                    if(0 < shipElement.x &&shipElement.x <= 10){
                        shipPositionElements.push({ x:shipElement.x, y: shipElement.y });
                    }
                }
            }
        }
        else {
            if(this.shipSize > 2){
                var leftShiftElement = {x: mousePosition.x, y: mousePosition.y - 1};
                if(0 < leftShiftElement.y){
                    shipPositionElements.push({ x:leftShiftElement.x, y: leftShiftElement.y });
                }

                for(var i = 0; i < this.shipSize-1; i++){
                    shipElement = {x: mousePosition.x, y: mousePosition.y + i};
                    if(shipElement.y <= 10){
                        shipPositionElements.push({ x:shipElement.x, y: shipElement.y });
                    }
                }
            }
            else {
                for(var i = 0; i < this.shipSize; i++){
                    shipElement = {x: mousePosition.x, y: mousePosition.y + i};
                    if(0 < shipElement.y &&shipElement.y <= 10){
                        shipPositionElements.push({ x:shipElement.x, y: shipElement.y });
                    }
                }
            }
        }
        if(!this.positionIsEmpty(shipPositionElements)){
            correctlyPositionResponse = false;
        }
        return { shipPositionElements: shipPositionElements, correctlyPositionResponse: correctlyPositionResponse};
    }

    function selectShipPositionMouseOut (event) {
        if(event.target.tagName.toUpperCase() === 'button'.toUpperCase()) {
            var mousePosition = {x: +event.target.dataset.x, y: +event.target.dataset.y};
            if (this.shipPosition === 'horizontal') {
                var leftShiftElement = {x: mousePosition.x - 1, y: mousePosition.y};
                if(0 < leftShiftElement.x){
                    document.querySelector("button[data-x='"+leftShiftElement.x+"'][data-y='"+leftShiftElement.y+"']").style.backgroundColor = null;
                }

                for (var i = 0; i < this.shipSize; i++) {
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

                for (var i = 0; i < this.shipSize; i++) {
                    shipElement = {x: mousePosition.x, y: mousePosition.y + i};
                    if(0 <= shipElement.y &&shipElement.y <= 10) {
                        document.querySelector("button[data-x='" + shipElement.x + "'][data-y='" + shipElement.y + "']").style.backgroundColor = null;
                    }
                }
            }
        }
    }

    function showShipOnBattlefield(shipPositionObject) {
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
            var placeIsEmpty = this.positionIsEmpty((shipPositionObject.shipPositionElements));

            if(placeIsEmpty){
                shipPositionObject.shipPositionElements.forEach((function (item) {
                    this.matrix[item.x - 1][item.y - 1] = 2;
                    document.querySelector("button[data-x='"+item.x+"'][data-y='"+item.y+"']").classList.add('ship-placed');
                    document.querySelector("button[data-x='"+item.x+"'][data-y='"+item.y+"']").style.backgroundColor = null;
                }).bind(this));

                --this.shipCount[shipPositionObject.shipPositionElements.length];
                disableShipTypeButtons.call(this, shipPositionObject.shipPositionElements.length);
            }
        }
    }
    
    function disableShipTypeButtons(currentShipSize) {
        if(this.shipCount[currentShipSize] === 0){
            document.querySelector("button[data-size='"+currentShipSize+"']").disabled = true;
            for (var key in this.shipCount){
                if(this.shipCount[key] !== 0){
                    this.shipSize = +key;
                }
            }
            if(currentShipSize === this.shipSize){
                this.shipSize = 0;
            }
        }

    }

    battlefield.addEventListener('mouseover', (function (event) {
        if(event.target.tagName.toUpperCase() === 'button'.toUpperCase()){
            var shipPositionObject = getShipPosition.call(this, event);
            showShipOnBattlefield(shipPositionObject);
        }
    }).bind(this));
    battlefield.addEventListener('mouseout', selectShipPositionMouseOut.bind(this));
    battlefield.addEventListener('click', (function (event) {
        var shipPositionObject = getShipPosition.call(this, event);
        addShip.call(this, shipPositionObject);

    }).bind(this));
}
PlayerBattlefield.prototype = Object.create(Battlefield.prototype);