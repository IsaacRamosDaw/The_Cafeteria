//!TO CHECK
const db = require("../models");
const Course = db.course;

exports.create = (req, res) => {
  // if (!req.user.role === "admin"){
  //   return res.status(403).json({
  //     message: "Access denied. Authentication required.",
  //   });
  // }

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Authentication required.",
    });
  }

  if(!req.body.name) {
    res.status(400).send({
      message: "There is no name",
    });
    
    return;
  }

  let courseData = {
    name: req.body.name
  };

  Course.create(courseData)
  .then((course) => {
    return res.json({ course: course});
  })
  .catch((err) => 
    res.status(500).send({
      message: "Some error while creating the course" || err.message,
    })
  );
};
exports.findAll = async (req, res) => {
  Course.findAll()
  .then(courses => {
    if(!courses){
      return res.status(404).json({
        mesage: "Course created succesfully",
      })
    }
    res.send(courses);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error ocurred while retrieving the course"
    })
  })
}


exports.findOne = (req, res) => {
  const id = req.params.id;

  Course.findByPk(id)
  .then((course) => {
    if(!course){
      return res.status(404).json({
        message: `Course with id=${id} not found`,
      });
    }
    res.send(course);
  })
  .catch((err) => {
    res.status(500).send({
      message: `Error retrieving course with id=${id},`
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
      message: "You do not have the permission to change it",
    });
  }

  const courseUpdate = {
    name: req.body.name,
  };

  Course.update(courseUpdate, {where: {id: id}})
  .then(([rowsUpdated]) => {
    if(rowsUpdated === 0) {
      return res.status(404).send({
        message: `Cannot update course with id=${id}. Course did not found`
      })
    }
    res.send({ message: "Course was edited succesfully"});
  })
  .catch((err) => 
    res.status(500).send({
      message: "An error ocurred while creating Course: " || err.message,
    })
  )
}
exports.delete = (req, res) => {
  const id = req.params.id;

  if(req.user.role !== "admin") {
    return res.status(403).send({
      message: "Access denied. You can only delete your own data.",
    });
  }

  Course.destroy({where: {id: id}})
  .then((courseDeleted) => {
    if(courseDeleted) {
      res.json({message: `Course with id: ${id} was deleted.`});
    } else {
      res.status(404).json({
        message: "Course not found"
      });
    }
  })
  .catch((err) => 
    res.status(500).json({
      message: "Error deleting course."
    })
  )
}