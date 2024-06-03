const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    displayName:String,
    email: String,
    password: String,
    inLobby: Boolean,
    aboutMe:String,
    links:Array,
    tags:Array,
    gameSettings:[
      {
        game:String,
        ign:String,
        rank:String,
        verrifaction: String,
        tags:Array,
        gameProfile:String
      }
    ],
    gameFilters:[
      {
        game:String,
        rank:String,
        verifaction:String,
        gameProfile:String
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
