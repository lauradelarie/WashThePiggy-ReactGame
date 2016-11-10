'use strict';

// game-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = new Schema({
  spot: { type: String, required: true },
  cleaned: { type: Boolean, required: true, 'default': false },
});

const playerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  color: { type: String, required: false },
  name: { type: String, required: true },
  cleanedSpots: [String]
  // could also make this into a number instead, and every time we click on the spot you just get plus one.
});

const gameSchema = new Schema({
  spots: [spotSchema],
  players: [playerSchema],
  started: { type: Boolean, required: true, 'default': false },
  winner: { type: Number, required: false },
  turn: { type: Number, required: true, 'default': 0 },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  draw: { type: Boolean, required: false }
});

const gameModel = mongoose.model('game', gameSchema);

module.exports = gameModel;
