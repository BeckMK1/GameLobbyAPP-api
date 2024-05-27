const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    inContent: Boolean,
    aboutMe:String,
    links:Array,
    tags:String,
    gameSettings:[
      {
        game:String,
        mode:String,
        tags:Array
      }
    ],
    gameFilters:[
      {
        game:String,
        rank:String,
        verifactionLink:String,
        gameProfileLink:String
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
