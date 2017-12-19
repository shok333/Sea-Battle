+(function () {
    document.querySelector('#hide-menu-and-start-game').onclick = function () {
      if(document.querySelector("#computer-radio-button").checked){
          Battlefield.computerStart = true;
      }
      document.querySelector("#start-menu").style.display = 'none';
    };
    var playerBattlefield = new PlayerBattlefield(document.querySelector('.player-battlefield'));
    var computerBattlefield = new ComputerBattlefield();
})();