const jwt = require("jsonwebtoken");

//! Separar basic y bearer

module.exports = (req, res, next) => {
  console.log("Using auth middleware");

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return next(); // Si no hay token, continúa sin autenticación
  }

  // Manejo de autenticación básica (Basic Auth)
  if (authHeader.startsWith("Basic ")) {
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [username, password] = credentials.split(":");

    // Asignar credenciales al cuerpo de la solicitud
    if (!req.body.username) req.body.username = username;
    if (!req.body.password) req.body.password = password;

    return next();
  }

  // Manejo de autenticación con JWT (Bearer Token)
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Token no proporcionado.",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({
          error: true,
          message: "Token inválido o expirado.",
        });
      }

      // Adjuntar el usuario decodificado a la solicitud
      req.user = user;
      req.token = token;
      next();
    });
  } else {
    return res.status(401).json({
      error: true,
      message: "Formato de autorización no válido.",
    });
  }
};