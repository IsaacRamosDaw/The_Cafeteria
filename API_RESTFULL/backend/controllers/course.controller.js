const db = require("../models");
const Course = db.course;

exports.create = (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Authentication required.",
    });
  }

  if (!req.body.name || req.body.name.trim() === "") {
    return res.status(400).send({
      message: "El nombre del curso es obligatorio.",
    });
  }

  // if (req.body.name.length < 3) {
  //   return res.status(400).send({
  //     message: "El nombre del curso debe tener al menos 3 caracteres.",
  //   });
  // }

  let courseData = {
    name: req.body.name,
  };

  Course.create(courseData)
    .then((course) => {
      return res.json({ course: course });
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Ocurrió un error mientras se creaba el curso.",
      })
    );
};

exports.findAll = async (req, res) => {
  Course.findAll()
  .then(courses => {
    if(!courses){
      return res.status(404).json({
        mesage: "No courses",
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

  if (!req.body.name || req.body.name.trim() === "") {
    return res.status(400).send({
      message: "El nombre no puede estar vacío.",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).send({
      message: "No tienes permiso para modificar este curso.",
    });
  }

  const courseUpdate = {
    name: req.body.name,
  };

  Course.update(courseUpdate, { where: { id: id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        return res.status(404).send({
          message: `No se pudo actualizar el curso con id=${id}. Curso no encontrado.`,
        });
      }
      res.send({ message: "El curso se actualizó exitosamente." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió un error mientras se actualizaba el curso.",
      });
    });
};


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