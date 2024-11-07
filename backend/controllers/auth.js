// const jwt = require('jsonwebtoken');
// const utils = require('../utils');
// const bcrypt = require('bcryptjs');
// const db = require("../models");

// exports.signin = async (req, res) => {
//   const {username, password} = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ 
//      error: 'Username and password required' });
//   }

// let User;
// switch (userType){
// case 'admin':
// User= db.admin
// break;
// case 'worker':
// User= db.worker
// break;
// case 'school':
// User= db.school
// break;
// default;
// return res.status(400).json({ error: 'Invalid user type' });
// }

// try {
//     const user = await User.findOne({ where: { username } });
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     // Validamos la contraseña
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

//     // Generamos el token
//     const token = utils.generateToken(user, userType);
//     const userObj = utils.getCleanUser(user);

//     res.json({ user: userObj, token });
// } catch (err) {
//     res.status(500).json({ error: 'Internal error' });
// }
// };

// exports.isAuthenticated = (req, res, next) => {
//   // check header or url parameters or post parameters for token
//   // var token = req.body.token || req.query.token;
//   var token = req.token;
//   if (!token) {
//     return res.status(400).json({
//       error: true,
//       message: "Token is required."
//     });
//   }
//   // check token that was passed by decoding token using secret
//   // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
//   jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
//     if (err) return res.status(401).json({
//       error: true,
//       message: "Invalid token."
//     });

//     User.findByPk(user.id)
//       .then(data => {
//         // return 401 status if the userId does not match.
//         if (!user.id) {
//           return res.status(401).json({
//             error: true,
//             message: "Invalid user."
//           });
//         }
//         // get basic user details
//         next();
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving User with id=" + id
//         });
//       });
//   });
// };