const db = require("../models");
const { findOne } = require("../models/user.model");
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
        tags:user.tags,
      })
    })
  };
  exports.updateUserInfo = (req, res) =>{
    const id = req.body.id
    const update = {
      aboutMe: req.body.aboutMe,
      links: req.body.links,
      tags: req.body.tags,
      displayName: req.body.displayname
    }
    User.findOneAndUpdate(id, update).exec((err, user)  => {
      if(err){
        return res.status(500).send({ message: err });
      }
      if(!user){
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send("profile updated")
    });
  }
  exports.updateGameSettings = (req, res) =>{
    const id = req.body.id
    const update = req.body.gameSettings
    User.findOneAndUpdate(id, {$push:{gameSettings:update}}).exec((err, user)  => {
      if(err){
        return res.status(500).send({ message: err });
      }
      if(!user){
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send("gamesettings updated")
    });
  }
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };