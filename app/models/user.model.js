const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    displayName:String,
    email: String,
    password: String,
    inLobby: String,
    aboutMe:String,
    links:Array,
    tags:Array,
    gameSettings:[
      {
        game:String,
        ign:String,
        rank:String,
        tags:Array,
        gameProfile:String
      }
    ],
    gameFilters:[
      {
        title:String,
        game:String,
        mode:String,
        tags:Array,
      }
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
