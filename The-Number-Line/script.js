(function(global) {
  "use strict";
  
  const Vue = global.Vue;
  
  function getNumberRate(t = 1) {
    return t;
  }
  
  function format(number, int = false) {
    if (number < 0) return "-" + format(-number);
    if (int && number < 999999.5) return number.toFixed(0);
    if (number <= 9.9995) number.toFixed(3);
    if (number < 1000) return number.toPrecision(4);
    if (number < 999999.5) return number.toFixed(0);
    let exponent = Math.floor(Math.log10(number));
    let mantissa = number / 10 ** exponent;
    if (format(mantissa) === "10.000") {
      mantissa = 1;
      exponent++;
    }
    return format(mantissa) + "e" + exponent.toFixed(0);
  }
  
  const newGame = {
    lastTick: Date.now(),
    offlineProg: true,
    number: 0
  };
  
  const game = {};
  
  function reset(obj = newGame) {
    for (const i in obj) {
      game[i] = obj[i];
    }
  }
  
  function save() {
    localStorage.setItem("TheNumberLineSave", btoa(JSON.stringify(game)));
  }
  
  function load() {
    if (localStorage.getItem("TheNumberLineSave") === null) {
      const loadgame = JSON.parse(atob(localStorage.getItem("TheNumberLineSave")));
      loadGame(loadgame);
    } else reset();
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
    game.number += getNumberRate(time);
  }
  
  function simulateTime(ms) {
    for (let i = 0; i < 10; i++) {
      loop(ms / 10000);
    }
  }
  
  load();
  
  const vue = Vue.createApp({
    el: "#app",
    data: { game },
    methods: {
      getNumberRate,
      format
    }
  });
})(this);
