/*
The Number Line v0.1.0
© 2022 resu deteleD
Licensed under the MIT License
*/

(function(global) {
  "use strict";
  
  const VERSION = "0.1.0";
  
  const Vue = global.Vue;
  
  const game = Vue.reactive({});  
  
  const newGame = {
    version: VERSION,
    timeStarted: Date.now(),
    lastTick: Date.now(),
    offlineProg: true,
    highestNumber: 0,
    number: 0,
    compressors: [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]
  };
  
  function getNumberRate(t = 1) {
    return 2 ** game.compressors.reduce((x, y) => x + y) * t;
  }
  
  function getCompressCost(x) {
    return 10 ** (x * (game.compressors[x - 1] + 1));
  }
  
  function format(number, int = false) {
    if (number < 0) return "-" + format(-number);
    if (int && number < 999999.5) return number.toFixed(0);
    if (number <= 9.9995) number.toFixed(3);
    if (number < 1000) return number.toPrecision(4);
    if (number < 999999.5) return number.toFixed(0);
    let exponent = Math.floor(Math.log10(number));
    let mantissa = number / 10 ** exponent;
    if (format(mantissa) === "10.00") {
      mantissa = 1;
      exponent++;
    }
    return format(mantissa) + "e" + exponent.toFixed(0);
  }
  
  function compress(x) {
    if (game.number >= getCompressCost(x)) {
      game.number -= getCompressCost(x);
      game.compressors[x - 1]++;
    }
  }
  
  function reset(obj = newGame) {
    for (const i in obj) {
      game[i] = obj[i];
    }
  }
  
  function loop(time) {
    game.number += getNumberRate(time);
    game.highestNumber = Math.max(game.number, game.highestNumber);
  }
  
  function simulateTime(ms) {
    game.lastTick = Date.now();
    for (let i = 0; i < 10; i++) {
      loop(ms / 10000);
    }
  }
  
  function save() {
    localStorage.setItem("TheNumberLineSave", btoa(JSON.stringify(game)));
  }
  
  function loadGame(loadgame) {
    for (const i in loadgame) {
      game[i] = loadgame[i];
    }
    const diff = Date.now() - game.lastTick;
    console.log(diff);
    if (game.offlineProg) {
      simulateTime(diff, true);
    }
  }
  
  function load() {
    reset();
    if (localStorage.getItem("TheNumberLineSave") !== null) {
      loadGame(JSON.parse(atob(localStorage.getItem("TheNumberLineSave"))));
    }
    setInterval(() => simulateTime(Date.now() - game.lastTick), 0);
    setInterval(() => save(), 5000);
  }
  
  function importSave() {
    try {
      const txt = prompt("Copy-paste your save. WARNING: WILL OVERWRITE YOUR SAVE");
      loadGame(JSON.parse(atob(txt)));
      save();
      location.reload();
    } catch (e) {
      console.log(e);
    }
  }
  
  function exportSave() {
    prompt("Copy-paste the following save:", btoa(JSON.stringify(game)));
  }
  
  function hardReset() {
    if (prompt('Are you sure you want to reset your game? This cannot be undone! Type "reset" without quotation marks to reset your game.') === "reset") {
      localStorage.removeItem("TheNumberLineSave");
      location.reload();
    }
  }
  
  load();
  
  Vue.createApp({
    data() {
      return {
        VERSION,
        game,
        tab: 0,
        save,
        importSave,
        exportSave,
        hardReset,
        compress,
        getNumberRate,
        getCompressCost,
        format
      };
    }
  }).mount("#app");
})(this);
