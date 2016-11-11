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
    const spots = [
      "https://d30y9cdsu7xlg0.cloudfront.net/png/137806-200.png",
      "http://www.clker.com/cliparts/R/F/r/c/n/e/black-splat-hi.png",
      "http://www.clipartkid.com/images/199/water-splash-clip-art-at-clker-com-vector-clip-art-online-royalty-WG1xZH-clipart.png",
      "http://www.pngmart.com/files/3/Chocolate-Splash-PNG-Clipart.png",
      "https://s-media-cache-ak0.pinimg.com/originals/07/01/3f/07013f90f99bdf7bf1883539c17e05aa.jpg",
      "http://www.clipartkid.com/images/272/mud-clip-art-at-clker-com-vector-clip-art-online-royalty-free-W0E5dR-clipart.png",
      "http://4vector.com/i/free-vector-chocolate-donut-clip-art_112627_Chocolate_Donut_clip_art_hight.png",
      "http://images.clipartpanda.com/mud-clipart-dirt-splat-clipart-1.jpg",
      "http://www.clipartkid.com/images/272/songs-of-mark-cote-november-2010-MxOVGe-clipart.gif",
      "https://d30y9cdsu7xlg0.cloudfront.net/png/137806-200.png",
      "http://www.clker.com/cliparts/R/F/r/c/n/e/black-splat-hi.png",
      "http://www.clipartkid.com/images/199/water-splash-clip-art-at-clker-com-vector-clip-art-online-royalty-WG1xZH-clipart.png",
      "http://www.pngmart.com/files/3/Chocolate-Splash-PNG-Clipart.png",
      "https://s-media-cache-ak0.pinimg.com/originals/07/01/3f/07013f90f99bdf7bf1883539c17e05aa.jpg",
      "http://www.clipartkid.com/images/272/mud-clip-art-at-clker-com-vector-clip-art-online-royalty-free-W0E5dR-clipart.png",
      "http://4vector.com/i/free-vector-chocolate-donut-clip-art_112627_Chocolate_Donut_clip_art_hight.png",
      "http://images.clipartpanda.com/mud-clipart-dirt-splat-clipart-1.jpg",
      "http://www.clipartkid.com/images/272/songs-of-mark-cote-november-2010-MxOVGe-clipart.gif",
    ]
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
