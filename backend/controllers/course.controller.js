const db = require("../models");
const Course = db.course;
const utils = require("../utils");

exports.create = (req, res) => {
  if(!req.body.name) {
    res.status(400).send({
      message: "There is no name",
    });
    return;
  }

  let course = {
    name: req.body.name
  };

  Course.findOne({ where: {name: course.name} })
  .then((data) => {
    if(data) {
      const token = utils.generateToken(data);
      const courseObje = utils.getCleanUser(data);

      return res.json({ course: courseObje, acces_token: token });
    }

    Course.create(course).then((data) => {
      console.log("Después de crear", data);
      const token = utils.generateToken(data);
      console.log("Después de crear el token", token);
      const courseObje = utils.getCleanUser(data);
      console.log("Después de limpiar el usuario", courseObje);

      return res.json({ course: courseObje, acces_token: token });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error while creating the course" || err.message,
      });
    });
  })

  .catch((err) => {
    res.status(500).send({
      message: "Some error ocurred while retrieving tutorial" || err.message,
    });
  });
};

exports.findAll = async (req, res) => {
  try {
    const courses = await Course.findAll();

    return res.json(courses);
  } catch (err) {
    return res.status(500).json({
      message: "Some error occurred while retrieving data." || err.message,
    });
  };
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Course.findByPk(id).then((data) => {
    if(!data){
      return res.status(404).json({
        message: `Course with id=${id} not found`,
      });
    }
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message: `Error retrieving course with id=${id}`,
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;

  if(!req.body.name){
    return res.status(400).send({
      message: "The name cannot be empty"
    })
  }

  if (req.user.role !== "admin") {
    return res.status(403).send({
      message: "You dont have the permission to change it",
    });
  }

  const update = {
    name: req.body.name,
  };

  Course.update(update, {where: {id: id}}).then(([rowsUpdated]) => {
    if(rowsUpdated === 0) {
      return res.status(404).send({
        message: `Cannot update Course with id=${id}. Course didnt found`
      })
    }
    res.send({ message: "Course was created succesfully"});
  }).catch((err) => {
    res.status(500).send({
      message: "An error ocurred while creating Course: " || err.message,
    })
  })
}

exports.delete = (req, res) => {
  const id = req.params.id;

  if(req.user.role !== "admin") {
    return res.status(403).send({
      message: "Access denied. You can only delete your own data.",
    });
  }

  Course.destroy({where: {id: id}}).then((deleted) => {
    if(deleted) {
      console.log("Course with id:", id, "was deleted.");
      res.json({message: "Course not found"});
    } else {
      console.log("Course with id:", id, "was not found");
      res.status(404).json({message: "Course not found"});
    }
    
  }).catch((err) => {
    console.error("Error deleting course:", err);
    res.status(500).json({message: "Error deleting course."});
  })
}