const controller = require("../controllers/lobby.controller");
const { authJwt } = require("../middleware");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/lobby", controller.lobby);
  app.post("/api/test/lobbyCreate", [authJwt.verifyToken], controller.lobbyCreate)
  app.patch("/api/test/lobbyJoin/:id", [authJwt.verifyToken], controller.lobbyJoin)
  app.post("/api/test/lobbyMy", controller.lobbyMy)
  app.patch("/api/test/lobbyLeave/:id", [authJwt.verifyToken], controller.lobbyLeave)
};