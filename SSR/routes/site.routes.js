module.exports = (app) => {
  const authSession = require("../controllers/auth.session");
  var router = require("express").Router();

  // router.post("/", authSession.signin, (req, res) => res.render("admins.views/home.admin.ejs", { user: "mansour" }));

  // login view if not session
  router.get("/login", authSession.login);

  // Sign ing a user
  router.post("/signin", authSession.signin);

  // Logout a user
  router.post("/logout", authSession.logout);

  app.use("", router);
};
