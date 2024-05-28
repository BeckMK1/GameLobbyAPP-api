const mongoose = require("mongoose");

const Lobby = mongoose.model(
  "Lobby",
  new mongoose.Schema({
    name: String,
    game:String,
    mode:String,
    links:Array,
    about:String,
    tags:Array,
    players:Array,
    maxPlayers:Number
  })
);

module.exports = Lobby;
