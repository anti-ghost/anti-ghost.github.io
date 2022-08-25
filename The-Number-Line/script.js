(function(window) {
  "use strict";
  
  const Vue = window.Vue;
  
  const newGame = {
    lastTick: Date.now(),
    offlineProg: true,
    number: 0
  };
  
  const game = {};
  
  function reset() {
    for (const i in newGame) {
      game[i] = newGame[i];
    }
  }
  
  function save() {
    localStorage.setItem("TheNumberLineSave", btoa(JSON.stringify(game)));
  }
  
  function load() {
    const loadgame = JSON.parse(atob(localStorage.getItem("TheNumberLineSave")));
    if (loadgame !== null) {
      loadGame(loadgame);
    }
    setInterval(() => simulateTime(Date.now() - game.lastTick), 0);
    setInterval(() => save(), 5000);
  }
  
  function loadGame(loadgame) {
    for (const i in loadgame) {
      game[i] = loadgame[i];
    }
    const diff = Date.now() - game.lastTick;
    console.log(diff);
    if (game.offlineProg) {
      simultateTime(diff);
    }
  }
  
  function loop(time) {
    game.lastTick = Date.now();
  }
  
  function simulateTime(ms) {
    for (let i = 0; i < 10; i++) {
      loop(ms / 10000);
    }
  }
  
  reset();
  load();
  
  const vue = new Vue({
    el: "#app",
    data: {game},
    methods: {}
  });
})(this);
