module.exports = app => {
    const school = require("../controllers/school.controller.js");
    var upload = require('../multer/upload.js');
    const auth = require("../controllers/auth.js");


    var router = require("express").Router();

    //Create a school

    router.post("/", school.create);

    //List all schools
    router.get("/", school.findAll);

    router.get("/:id", auth.isAuthenticated, school.findOne);

    // Update school
    router.put("/:id", auth.isAuthenticated, school.update);

    // router.put("/upload/:id", upload.single('file'), school.imgUpdate);

    //Delete school
    router.delete("/:id", auth.isAuthenticated, school.delete);

    app.use('/api/schools', router);

};