module.exports = (app) => {
  const admin = require("../controllers/admin.controller.js");

  const authSession = require("../controllers/auth.session.js");
  var upload = require("../multer/upload.js");

  var router = require("express").Router();

  //Create an admin
  router.post("/", admin.create);
  
  router.post("/upload/:folderName", upload.single('file'), admin.create);

  router.put("/upload/:id", upload.single('file'), admin.imgUpdate);

  //List all admins
  router.get("/", authSession.isAuthenticated, admin.index);

  // Get one admin
  router.get("/:id", authSession.isAuthenticated, admin.findOne);

  router.get("/edit/:id",authSession.isAuthenticated, admin.edit);
  
  router.put("/edit/:id",authSession.isAuthenticated, admin.update);

  //Delete admin
  router.delete("/:id", authSession.isAuthenticated, admin.delete);
  
  router.get("/create", (req, res) => res.render("admins.views/crudAdmin/createAdmin"));

  router.get("/testAdmins", async (req, res) => {
    try {
        const admins = await admin.findAll();
        res.render("admins.views/testHomeAdmin", {
            pageContent: await res.render("admins.views/crudAdmin/listAdmins", { admins }, true),
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error interno del servidor.");
    }
});


  app.use("/api/admin", router);
}; 
