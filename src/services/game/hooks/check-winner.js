'use strict';

// src/services/game/hooks/check-winner.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    const spots = hook.data.spots;
    const turn = hook.data.turn;
    const players = hook.data.players;

    const cleanedSpots = spots.filter((spot) => (spot.cleaned))

  };
};
