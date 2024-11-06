// var jwt = require('jsonwebtoken');

// function generateToken(user){
//     if(!user) return null;

//     var u = {
//         id: user.id,
//         name: user.username,
//         isAdmin: user.isAdmin,
//         password: user.password
//     };

//     return jwt.sign(u, process.env.JWT_SECRET, {
//         expiresIn: 60 * 60 * 24
//     });
// }

// function getCleanUser(user){
//     if(!user) return null;

//     return {
//         id: user.id,
//         name: user.name,
//         password: user.password
//       };
// }

// module.exports = {
//     generateToken,
//     getCleanUser
// }