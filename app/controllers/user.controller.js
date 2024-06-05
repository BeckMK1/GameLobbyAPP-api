const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.usersInfo = (req, res) => {
    User.findOne({
      username: req.body.username
    }).exec((err, user)=>{
      if(err){
        return res.status(500).send({ message: err });
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send({
        username: user.username, 
        id:user._id, 
        aboutMe: user.aboutMe, 
        links:user.links,
        tags: user.tags
      })
    })
  };
  exports.currentUserInfo = (req, res) => {
    User.findOne({
      _id: req.params.id
    }).exec((err, user)=>{
      if(err){
        return res.status(500).send({ message: err });
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send({
        displayName: user.displayName,
        inLobby: user.inLobby,
        aboutMe: user.aboutMe,
        tags: user.tags,
        links:user.links,
        gameSettings: user.gameSettings,
        gameFilters: user.gameFilters
      })
    })
  }
  exports.updateUserInfo = (req, res) =>{
    const id = {_id:req.params.id}
    const update = {
      displayName: req.body.displayName,
      aboutMe: req.body.aboutMe,
      links: req.body.links,
      tags: req.body.tags
    }
    User.findOneAndUpdate(id, update,{safe: true, upsert: true},
      function(err, user){
        if(err){
          return res.status(500).send({ message: err });
        }
        if(!user){
          return res.status(404).send({ message: "User Not found." });
        }
        res.status(200).send("profile updated")
      }
    )
  }
  exports.updateGameSettings = (req, res) =>{
    const id = req.params.id
    const update = {
     game: req.body.game,
     ign: req.body.ign,
     rank: req.body.rank,
     verrifaction: req.body.verrifaction,
     tags: req.body.tags,
     gameProfile: req.body.gameProfile 
    }
    const create = {
      game: req.body.game,
      ign: req.body.ign,
      rank: req.body.rank,
      verrifaction: req.body.verrifaction,
      tags: req.body.tags,
      gameProfile: req.body.gameProfile 
    }
    let isSetting = false
    const game = req.body.game
    User.findOne({_id:id}, 
      function(err, user){
        if(err){
          return res.status(500).send({ message: err });
        }
        if(!user){
          return res.status(404).send({ message: err });
        }
        user.gameSettings.forEach(gameSetting => {
          isSetting = gameSetting.game.includes(game)
        });
        if(isSetting == true){
           User.findOneAndUpdate({_id:id, "gameSettings.game": game}, {$set:{"gameSettings.$": update}},{safe: true, upsert: true},
           function(err, user){
            if(err){
              console.log(err)
              return res.status(500).send({ message: err });
            }
            if(!user){
              return res.status(404).send({ message: "User Not found." });
            }
             return res.status(200).send("setting updated")
          }
           )
        }
        else{
          User.findOneAndUpdate({_id:id}, {$push:{gameSettings:create}},{safe: true, upsert: true},
            function(err, user){
              if(err){
                return res.status(500).send({ message: err });
              }
              if(!user){
                return res.status(404).send({ message: "User Not found." });
              }
               return res.status(200).send("setting created")
            }
          )
        }
      }
    )
  }
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };