function PlayerBattlefield(battlefield) {
    this.shipCount = {
        1: 4,
        2: 3,
        3: 2,
        4: 1,
    };


    var shipTypesPanel = document.querySelector('.ship-types');

    this.matrix = this.createMatrix();

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