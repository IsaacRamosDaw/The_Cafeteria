const db = require("../models");
const Category = db.categories;

exports.create = (req, res) => {
    //Validar 
    if(!req.body.id){
        res.status(400).send({
            message: "Content can not empty!"
        });
    }
}

// Crear una Categoría
    const category= {
        name: req.body.name
    };

//Guardar categoría en la base de datos
    Category.create(category)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error ocurred while creting the category."
        });
    });

// Listar todas las categorías de la base de datos
    exports.findAll = (req, res) => {
        Category.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categories."
            });
        });
    }

exports.update = (req, res) => {
    const id = req.params.id;

    // Validar que el campo "name" esté presente
    if (!req.body.name) {
        return res.status(400).send({
            message: "The name field cannot be empty."
        });
    }

    const updateCategory = {
        name: req.body.name,
    };

    // Intentar actualizar la categoría
    Category.update(updateCategory, {
        where: { id: id }
    })
    .then(rowsUpdated => {
        if (rowsUpdated[0] === 0) {
            // Si no se actualizó ninguna fila, es que no se encontró la categoría
            return res.status(404).send({
                message: `Cannot update Category with id=${id}. Category not found.`
            });
        }
        res.send({ message: "Category was updated successfully." });
    })
    .catch(err => {
        // Capturar cualquier error
        res.status(500).send({
            message: err.message || "An error occurred while updating the Category."
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({ where: { id: id } }).then(deleted => {
        if (deleted) {
            console.log("Se borró la categoría con id:", id);
            res.json({ message: "Categoría eliminada correctamente." });
        } else {
            console.log("No se encontró la categoría con id:", id);
            res.status(404).json({ message: "Categoría no encontrada." });
        }
    }).catch(err => {
        console.error("Error al borrar la categoría:", err);
        res.status(500).json({ message: "Error al eliminar la categoría." });
    });
};