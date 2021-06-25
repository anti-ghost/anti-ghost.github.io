(function() {
  "use strict";

  const Vue = window.Vue;

  let game;

  function reset() {
    game = {
      lastTick: Date.now(),
      ghosts: 0,
      autoclickers: 0,
      autoLoop: 0
    };
  }
  
  function save() {
    localStorage.setItem("ghostGameSave", JSON.stringify(game));
  }
  
  function load() {
    const loadgame = JSON.parse(localStorage.getItem("ghostGameSave"));
    if (loadgame !== null) {
      loadGame(loadgame);
    }
    window.setInterval(() => loop(Date.now() - game.lastTick), 16.6667);
  }
  
  function loadGame(loadgame) {
    reset();
    for (const i in loadgame) {
      game[i] = loadgame[i];
    }
    const diff = Date.now() - game.lastTick;
    console.log(diff);
    loop(diff, true);
  }

  function increment() {
    game.ghosts++;
  }
  
  function buyAutoclicker() {
    if (game.ghosts >= 10 * 2 ** game.autoclickers) {
      game.ghosts -= 10 * 2 ** game.autoclickers;
      game.autoclickers++;
    }
  }
  
  function loop(ms, off = false) {
    game.lastTick = Date.now();
    game.autoLoop += ms * game.autoclickers;
    if (game.autoLoop >= 1000) {
      game.ghosts += Math.floor(game.autoLoop / 1000);
      game.autoLoop %= 1000;
    }
    save();
  }
  
  reset();
  load();

  const vue = new Vue({
    el: "#app",
    data: {
      game: game
    },
    methods: {
      increment: increment,
      buyAutoclicker: buyAutoclicker
    }
  });
})();
