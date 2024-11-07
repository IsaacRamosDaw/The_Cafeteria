module.exports = app => {
    const school = require("../controllers/school.controller.js");

    var router = require("express").Router();
     // router.post('/signin', (req, res) => auth.signin(req, res, 'school'));

    //Create a school

    router.post("/", school.create);
     // router.post("/", auth.isAuthenticated, schoolController.create);

    //List all schools
    router.get("/", school.findAll);
     // router.get("/", auth.isAuthenticated, schoolController.create);

    router.get("/:id", school.findOne);
    // router.get("/:id", auth.isAuthenticated, schoolController.findOne);

    // Update school
    router.put("/:id", school.update);
    // router.put("/:id", auth.isAuthenticated, schoolController.update);

    //Delete school
    router.delete("/:id", school.delete);
    // router.delete("/:id", auth.isAuthenticated, schoolController.delete);

    app.use('/api/schools', router);

};