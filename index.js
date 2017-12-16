+(function () {
    var shipSize=1;
    var panel = document.querySelector('.panel');
    var playerBattlefield = document.querySelector('.player-battlefield');
    var shipPosition = 'horizontal';

    function selectShipSize(event) {
        shipSize = +(event.target.dataset.size);
    }

    panel.addEventListener('click',selectShipSize);

    function correctlyPlace(mousePosition) {
        if(shipPosition === 'horizontal'){
            if(shipSize > 2){
                var leftPart = mousePosition.x - 1;
                var rightPart = mousePosition.x + shipSize - 2;
                if(leftPart > 0 && rightPart <= 10){
                    return true;
                }
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
    }

    function selectShipPosition(event) {
        if(event.target.tagName.toUpperCase() === 'button'.toUpperCase()){
            var mousePosition = { x: +event.target.dataset.x, y: +event.target.dataset.y };
            var selectColor = 'pink';
            if(!correctlyPlace(mousePosition)){
                selectColor = 'red';
            }
            var shipElement = {x: null, y: null};
            if(shipPosition === 'horizontal'){
                if(shipSize > 2){
                    var leftShiftElement = {x: mousePosition.x - 1, y: mousePosition.y};
                    if(0 < leftShiftElement.x){
                        document.querySelector("button[data-x='"+leftShiftElement.x+"'][data-y='"+leftShiftElement.y+"']").style.backgroundColor = selectColor;
                    }

                    for(var i = 0; i < shipSize-1; i++){
                        shipElement = {x: mousePosition.x + i, y: mousePosition.y};
                        if(shipElement.x <= 10){
                            document.querySelector("button[data-x='"+shipElement.x+"'][data-y='"+shipElement.y+"']").style.backgroundColor = selectColor;
                        }
                    }
                }
                else {
                    for(var i = 0; i < shipSize; i++){
                        shipElement = {x: (+mousePosition.x) + (+i), y: mousePosition.y};
                        if(0 < shipElement.x &&shipElement.x <= 10){
                            document.querySelector("button[data-x='"+shipElement.x+"'][data-y='"+shipElement.y+"']").style.backgroundColor = selectColor;
                        }
                    }
                }
            }
        }
    }
    function selectShipPositionMouseOut(event) {
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
        }
    }

    playerBattlefield.addEventListener('mouseover', selectShipPosition);
    playerBattlefield.addEventListener('mouseout', selectShipPositionMouseOut);

})();