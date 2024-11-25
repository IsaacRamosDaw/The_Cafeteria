module.exports = app => {
    const school = require("../controllers/school.controller.js");
    var upload = require('../multer/upload.js');

    var router = require("express").Router();

    //Create a school

    router.post("/", upload.single('file'), school.create);

    //List all schools
    router.get("/", school.findAll);

    router.get("/:id", school.findOne);

    // Update school
    router.put("/:id", upload.single('file'), school.update);

    //Delete school
    router.delete("/:id", school.delete);

    app.use('/api/schools', router);

};