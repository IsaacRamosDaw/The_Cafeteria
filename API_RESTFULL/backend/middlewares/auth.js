const jwt = require("jsonwebtoken");

// //! Separar basic y bearer

// module.exports = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) {
//     return next(); 
//   }


//   if (authHeader.startsWith("Basic ")) {
//     const base64Credentials = authHeader.split(" ")[1];
//     const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
//     const [username, password] = credentials.split(":");


//     if (!req.body.username) req.body.username = username;
//     if (!req.body.password) req.body.password = password;

//     return next();
//   }
 
//   if (authHeader.startsWith("Bearer ")) {
//     const token = authHeader.replace("Bearer ", "");

//     if (!token) {
//       return res.status(401).json({
//         error: true,
//         message: "Token no proporcionado.",
//       });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.status(401).json({
//           error: true,
//           message: "Token inválido o expirado.",
//         });
//       }

//       req.user = user;
//       req.token = token;
//       next();
//     });
//   } else {
//     return res.status(401).json({
//       error: true,
//       message: "Formato de autorización no válido.",
//     });
//   }
// };

module.exports = (req, res, next) => {
  console.log("Paso por authToken");
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) {
    console.log("Sin authHeader, pasando...");
    return next();
  }

  if (authHeader.startsWith("Basic ")) {
    console.log("Autenticación básica detectada.");
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [username, password] = credentials.split(":");

    if (!req.body.username) req.body.username = username;
    if (!req.body.password) req.body.password = password;

    console.log("Usuario autenticado:", username);
    return next();
  }

  if (authHeader.startsWith("Bearer ")) {
    console.log("Autenticación con JWT detectada.");
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      console.log("No hay token en la cabecera.");
      return res.status(401).json({
        error: true,
        message: "Token no proporcionado.",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log("Token inválido o expirado.");
        return res.status(401).json({
          error: true,
          message: "Token inválido o expirado.",
        });
      }

      console.log("JWT verificado, usuario:", user);
      req.user = user;
      req.token = token;
      next();
    });
  } else {
    console.log("Formato de autorización incorrecto.");
    return res.status(401).json({
      error: true,
      message: "Formato de autorización no válido.",
    });
  }
};