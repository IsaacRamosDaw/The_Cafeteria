module.exports = (app) => {
  const auth = require("../controllers/auth.js");
  var router = require("express").Router();

  router.post("/", auth.signin, (req, res) =>
    res.render("admins.views/home.admin.ejs", { user: "mansour" })
  );

  app.use("/api/site", router);
};

