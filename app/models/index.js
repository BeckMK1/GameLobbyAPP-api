const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.lobby = require("./lobby.model")

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;