setInterval(function() {
  if (player.infinities.eq(0)) {
    bigCrunchReset();
    requestGalaxyReset();
    requestDimensionBoost();
    buyMaxTickSpeed();
    for (let i = 8; i > 0; i--) {
      buyAsManyAsYouCanBuy(i);
    }
    if (Sacrifice.nextBoost().gte(2) || (player.galaxies == 2 && player.dimensionBoosts > 12)) sacrificeBtnClick();
  }
}, 33);
