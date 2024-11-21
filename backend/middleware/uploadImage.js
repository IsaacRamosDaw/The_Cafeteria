// const multer = require("multer");

// // Almacenamiento de memoria
// const storage = multer.memoryStorage();

// const upload = multer({
//     storage,
//     limits: {fileSize: 5 * 1024 * 1024}, //5 MB
//     fileFilter: (req, file, cb) => {
//         if(file.mimetype.startsWith("image/")){
//             cb(null, true) //Acepta sólo imágenes
//         } else{
//             cb(new Error("That's not an image"), false);
//         }
//     }
// });

// module.exports = upload;