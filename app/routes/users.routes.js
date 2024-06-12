const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/getUser/:id", [authJwt.verifyToken], controller.getUser)
  app.post("/api/test/usersInfo", [authJwt.verifyToken], controller.usersInfo);
  app.get("/api/test/currentUserData/:id", [authJwt.verifyToken], controller.currentUserInfo)
  app.patch("/api/test/createGameFilters/:id", [authJwt.verifyToken], controller.createGameFilters)
  app.patch("/api/test/createGamesettings/:id", [authJwt.verifyToken], controller.createGameSettings)
  app.patch("/api/test/updataUserInfo/:id",[authJwt.verifyToken], controller.updateUserInfo)
  app.patch("/api/test/upadeteGamesettings/:id", [authJwt.verifyToken], controller.updateGameSettings)
  app.patch("/api/test/upadeteGameFilters/:id", [authJwt.verifyToken], controller.updateGameFilters)
};
