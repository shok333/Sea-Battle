function ComputerBattlefield() {
    this.matrix = this.createMatrix();
    this.computerBattlefield = document.querySelector('.computer-battlefield');

    addComputerShips.call(this);
    function random (min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }

    function addComputerShips () {
        var ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
        ships.forEach((function (item) {
            var shipPosirionCoordinates = addComputerShip.call(this, item);
            shipPosirionCoordinates.forEach((function (item) {
                this.matrix[item.x][item.y] = item.value;
            }).bind(this));
        }).bind(this));
        for (var i = 0; i < 10; i++){
            for(var j = 0; j < 10; j++){
                if(this.matrix[i][j] !== 0){
                    this.computerBattlefield.querySelector('button[data-x="'+(i+1)+'"][data-y="'+(j+1)+'"]').style.backgroundColor = 'gold';
                }
            }
        }
    }

    function addComputerShip (shipSize) {
        var uncorrectlyPositions = [];
        var positionHasFound = false;
        if(random(0,1)){
            var shipPosition = 'horizontal';
        }
        else {
            var shipPosition = 'vertical';
        }
        if(shipPosition === 'horizontal'){
           while (!positionHasFound){
               var response = [];
               var correctlyPosition = true;
               var x = random(0, 10 - shipSize);
               var y = random(0,9);

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
                var y = random(0, 10 - shipSize);
                var x = random(0,9);

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

    function addComputerMatrix() {
        var matrix = [];
        for( var i = 0; i < 10; i++){
            for ( var j = 0; j < 10; j++){
                matrix.push({x: i, y: j, value: 0});
            }
        }
        return matrix;
    }
}

ComputerBattlefield.prototype = Object.create(Battlefield.prototype);