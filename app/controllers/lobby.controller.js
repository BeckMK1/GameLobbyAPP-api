const db = require("../models");
const User = db.user;
const Lobby = db.lobby

exports.lobbyCreate = (req, res) => {
    const lobby = new Lobby({
        name:req.body.title,
        game:req.body.text,
        mode:req.body.mode,
        links:req.body.links,
        tags:req.body.tags,
        players:req.body.players,
        maxPlayers:req.body.maxPlayers
    })
    lobby.save((err, lobby) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else {
          const filter = {_id: req.body.id}
          const update = {inLobby: req.body.inLobby}
          User.findOneAndUpdate(filter, update, {upsert:true}, (err, doc)=>{
            if(err) return res.status(500).send(err);
            User.findOne(filter).then((user) =>{
              res.status(200).send(user.inLobby)
          })
          })
        }
    })
  };

exports.lobby = (req, res) => {
    Lobby.find({}).then((lobby) =>{
    res.send(lobby)
})
};

exports.lobbyJoin = (req, res) => {
  const id = req.params.id
  const message = 'Lobby full'
  Lobby.findByIdAndUpdate(id, {$push:{players:req.body.id}},{safe: true, upsert: true},
    function(err, doc) {
        if(players.length >= maxPlayers ^ err){
        console.log(`${err} or ${message}`);
        }else{
          const filter = {_id: req.body.id}
          const update = {inLobby: req.body.inLobby}
          User.findOneAndUpdate(filter, update, {upsert:true}, (err, doc)=>{
            if(err) return res.status(500).send(err);
            User.findOne(filter).then((user) =>{
              res.status(200).send(user.inLobby)
          })
          })
        }
    })
  res.status(200).send({message: 'user added'})
};

exports.lobbyMy = (req, res) => {
    Lobby.find({players:{$all: req.body.id}}).then((lobby) =>{
      res.status(200).send(lobby)
  })
  };
  exports.lobbyLeave = (req, res) => {
    const id = req.params.id
    Lobby.findByIdAndUpdate(id, {$pull:{players:req.body.id}},{safe: true, upsert: true},
      function(err, doc) {
          if(err){
          console.log(err);
          }else{
            Lobby.find({players:{$exists:true, $size:0}}).deleteMany().exec();
            const filter = {_id: req.body.id}
            const update = {inLobby: req.body.inLobby}
            User.findOneAndUpdate(filter, update, {upsert:true}, (err, doc)=>{
              if(err) return res.status(500).send(err);
              User.findOne(filter).then((user) =>{
                res.status(200).send(user.inLobby)
            })
            })
          }
      })
  };