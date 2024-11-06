// var jwt = require('jsonwebtoken');

// function generateToken(user){
//     if(!admin) return null;

//     var u = {
//         id: admin.id,
//         name: admin.username,
//         isAdmin: admin.isAdmin,
//         password: admin.password
//     };

//     return jwt.sign(u, process.env.JWT_SECRET, {
//         expiresIn: 60 * 60 * 24
//     });
// }

// function getCleanUser(user){
//     if(!admin) return null;

//     return {
//         id: admin.id,
//         name: admin.name,
//         password: admin.password
//       };
// }

// module.exports = {
//     generateToken,
//     getCleanUser
// }