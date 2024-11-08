var jwt = require('jsonwebtoken');

function generateToken(user){
    console.log("Generar token para el usuario", user);
    if(!user) return null;
    console.log("Generar token con la constante", user);
    const u = {
        id: user.id,
        name: user.username,
        role: user.role
    };
    console.log("Constante creada", u);
    return jwt.sign(u, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
    });
}

function getCleanUser(user){
    if(!user) return null;

    return {
        id: user.id,
        name: user.name,
        role: user.role
      };
}

module.exports = {
    generateToken,
    getCleanUser
}