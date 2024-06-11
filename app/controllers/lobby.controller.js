const db = require("../models");
const User = db.user;
const Lobby = db.lobby

exports.lobbyCreate = (req, res) => {
    const lobby = new Lobby({
        name:req.body.name,
        game:req.body.game,
        status:"idle",
        rank:req.body.rank,
        about:req.body.about,
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
          lobby.players.forEach((player)=>{
            const filter = {_id: player.id}
            const update = {inLobby: lobby.id}
            User.findOneAndUpdate(filter, update, {upsert:true}, (err, doc)=>{
              if(err) return res.status(500).send(err);
            })
          })
          res.status(200).send({message:'lobby created', id:lobby.id});
        }
    })
  };

exports.lobby = (req, res) => {
    Lobby.find({}).then((lobby) =>{
    res.send(lobby)
})
};
exports.filteredLobbies = (req, res) =>{
  const simplefilter = {
    game: req.body.game,
    mode: req.body.mode,
  }
  const complexFilter = {
    game: req.body.game,
    mode: req.body.mode,
    tags: {$all:req.body.tags}
  }
  if(req.body.tags.length == 0){
    try{
      Lobby.find(simplefilter).then((lobby)=>{
        res.send(lobby)
      })
    }catch(err){
      console.log("error: " + err)
    }
    return
  }
  try{
    Lobby.find(complexFilter).then((lobby)=>{
      res.send(lobby)
    })
  }catch(err){
    console.log("error: " + err)
  }

}
exports.lobbyJoin = (req, res) => {
  const id = req.params.id
  const message = 'Lobby full'
  Lobby.findById(id,function(err,lobby){
    if(lobby.players.length >= lobby.maxPlayers){
      return console.log(`${err} or ${message}`);
    }else {
    Lobby.findByIdAndUpdate(id, {$push:{players:req.body.player}},{safe: true, upsert: true},
      function(err, lobby) {
            const filter = {_id: req.body.id}
            const update = {inLobby: req.params.id}
            User.findOneAndUpdate(filter, update, {upsert:true}, (err, doc)=>{
              if(err) return res.status(500).send(err);
              User.findOne(filter).then((user) =>{
                return res.status(200).send({id:user.inLobby, message: 'user added'})
            })
            })
    })
  }
  })
};
exports.updateLobbyInfo = (req, res) =>{
  const update = {
    status: req.body.status,
    mode: req.body.mode,
    tags: req.body.tags,
    links: req.body.links,
    about: req.body.about,
  }
  Lobby.findByIdAndUpdate({_id:req.params.id}, update, 
    function(err, lobby){
      if(err){
        return res.status(500).send(err)
      }
      if(!lobby){
       return res.status(404).send("lobby not found")
      }
      return res.status(200).send(lobby)
    }
  )
}
exports.lobbyMy = (req, res) => {
    Lobby.findOne({_id:req.params.id},
      function(err, lobby){
        if(err){
          return res.status(500).send(err)
        }
        if(!lobby){
          return res.status(404).send("lobby not found")
        }
        return res.status(200).send(lobby)
      }
    )
  };
exports.lobbyLeave = (req, res) => {
    const id = req.params.id
    Lobby.findByIdAndUpdate(id, {$pull:{players:{id:req.body.id}}},{safe: true, upsert: true},
      function(err, doc) {
          if(err){
          console.log(err);
          }else{
            Lobby.find({players:{$exists:true, $size:0}}).deleteMany().exec();
            const filter = {_id: req.body.id}
            const update = {inLobby: ""}
            User.findOneAndUpdate(filter, update, {upsert:true}, (err, doc)=>{
              if(err) return res.status(500).send(err);
              User.findOne(filter).then((user) =>{
                res.status(200).send(user.inLobby)
            })
            })
          }
      })
};