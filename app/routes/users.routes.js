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

  app.get("/api/test/all", controller.allAccess);

  app.post("/api/test/usersInfo", [authJwt.verifyToken], controller.usersInfo);
  app.get("/api/test/currentUserData/:id",authJwt.verifyToken, controller.currentUserInfo)
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.patch("/api/test/updataUserInfo/:id", authJwt.verifyToken, controller.updateUserInfo)
  app.patch("/api/test/upadeteGamesettings/:id", authJwt.verifyToken, controller.updateGameSettings)
};
