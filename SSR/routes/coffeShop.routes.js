module.exports = (app) => {
  const coffeShop = require("../controllers/coffeShop.controller.js");
  const auth = require("../controllers/auth.js");
  const multer = require("../multer/upload.js");

  const upload = multer({ dest: "../public/images/coffeShop" });

  var router = require("express").Router();

  //List all coffeShops
  router.get("/", auth.isAuthenticated, coffeShop.findAll);

  // List one coffe shop
  router.get("/:id", auth.isAuthenticated, coffeShop.findOne);

  //Create an coffeShop
  router.post("/", auth.isAuthenticated, coffeShop.create);
  //
  router.put("/upload/:id", upload.single("file"), coffeShop.imgUpdate);

  // Update coffeShop
  router.put(
    "/:id",
    upload.single("file"),
    auth.isAuthenticated,
    coffeShop.update
  );

  //Delete coffeShop
  router.delete("/:id", auth.isAuthenticated, coffeShop.delete);

  app.use("/api/coffeShop", router);
};
