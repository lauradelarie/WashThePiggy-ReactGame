'use strict';

// src/services/game/hooks/create-game.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    const user = hook.params.user;

    // Assign the logged in user as the creator of the game
    hook.data.userId = user._id;

    // Set up the spots and shuffle them
    const spots = shuffle('✿★♦✵♣♠♥⚛'.repeat(2).split(''))
    hook.data.spots = spots
      .map((spot) => ({ cleaned: false, spot: spot }))

    // Add the logged in user as the first player
    hook.data.players = [{
      userId: user._id,
      name: user.name,
      color: '#f00',
      cleanedSpots: []
    }];

  };
};