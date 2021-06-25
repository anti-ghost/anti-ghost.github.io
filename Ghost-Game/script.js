(function() {
  "use strict";

  const Vue = window.Vue;

  let game;

  function reset() {
    game = {
      ghosts: 0
    };
  }

  function increment() {
    game.ghosts++;
  }

  const vue = new Vue({
    el: "#app",
    data: {
      game: game
    }
  });
})();
