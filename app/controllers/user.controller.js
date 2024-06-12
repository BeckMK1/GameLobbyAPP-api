const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  exports.getUser = (req, res) => {
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
        id: user._id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        roles: user.roles,
        inLobby: user.inLobby,
        aboutMe: user.aboutMe,
        tags: user.tags,
        links:user.links,
        gameSettings: user.gameSettings,
        gameFilters: user.gameFilters
      })
    })
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
  exports.createGameSettings = (req, res) =>{
    const id = req.params.id
    const create = {
      game: req.body.game,
      ign: req.body.ign,
      rank: req.body.rank,
      tags: req.body.tags,
      gameProfile: req.body.gameProfile 
    }
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
  exports.updateGameSettings = (req, res) =>{
    const id = req.params.id
    const update = {
     game: req.body.game,
     ign: req.body.ign,
     rank: req.body.rank,
     tags: req.body.tags,
     gameProfile: req.body.gameProfile 
    }
    const game = req.body.game
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
  exports.createGameFilters = (req, res) =>{
    const id = req.params.id
    const create = {
      title: req.body.title,
      game: req.body.game,
      mode: req.body.mode,
      tags: req.body.tags,
    }
    User.findOneAndUpdate({_id:id}, {$push:{gameFilters:create}},{safe: true, upsert: true},
      function(err, user){
        if(err){
          return res.status(500).send({ message: err });
        }
        if(!user){
          return res.status(404).send({ message: "User Not found." });
        }
         return res.status(200).send("filter created")
      }
    )
  }
  exports.updateGameFilters = (req, res) =>{
    const id = req.params.id
    const update = {
      title: req.body.title,
     game: req.body.game,
     mode: req.body.mode,
     tags: req.body.tags,
    }
    const title = req.body.title
      User.findOneAndUpdate({_id:id, "gameFilters.title": title}, {$set:{"gameFilters.$": update}},{safe: true, upsert: true},
           function(err, user){
            if(err){
              console.log(err)
              return res.status(500).send({ message: err });
            }
            if(!user){
              return res.status(404).send({ message: "User Not found." });
            }
             return res.status(200).send("filter updated")
          }
      )
  }