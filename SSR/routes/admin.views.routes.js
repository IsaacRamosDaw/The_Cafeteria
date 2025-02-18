module.exports = (app) => {
  const admin = require("../controllers/admin.controller.js");

  const authSession = require("../controllers/auth.session.js");

  var router = require("express").Router();

  //List all admins
  router.get("/", authSession.isAuthenticated, admin.index);

  router.get("/admins", authSession.isAuthenticated, admin.findAll);
  // Get one admin
  // router.get("/:id", authSession.isAuthenticated, admin.findOne);

  router.get("/edit/:id", authSession.isAuthenticated, admin.edit);

  router.get("/create", (req, res) =>
    res.render("admins.views/crudAdmin/createAdmin")
  );

  router.get("/testAdmins", async (req, res) => {
    try {
      const admins = await admin.findAll();
      res.render("admins.views/testHomeAdmin", {
        pageContent: await res.render(
          "admins.views/crudAdmin/listAdmins",
          { admins },
          true
        ),
      });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Error interno del servidor.");
    }
  });

  app.use("/admin", router);
};
