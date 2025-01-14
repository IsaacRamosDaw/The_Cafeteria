module.exports = (app) => {
  const auth = require("../controllers/auth.js");
  var router = require("express").Router();

  router.post("/", auth.signin, (req, res) => res.render("admins.views/home.admin.ejs", { user: "mansour" }));

  router.post("/logintest", auth.loginSite);

  // router.post("/signin", auth.loginSite);

  // router.post("/logout", auth.loginSite);

  app.use("/api/site", router);
};

