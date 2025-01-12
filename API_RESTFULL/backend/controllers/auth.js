const jwt = require("jsonwebtoken");
const utils = require("../utils");
const bcrypt = require("bcryptjs");
const db = require("../models");
const { login } = require("./site.controller");

exports.signin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password required",
    });
  }

  try {
    let user = await login(username);
    // console.log(user);

    if (!user) return res.status(404).json({ error: "User not found" });

    // Validate the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

    // Generate token
    const token = utils.generateToken(user);
    const userObj = utils.getCleanUser(user);

    res.json({ user: userObj, token });
  } catch (err) {
    res.status(500).json({ error: "Internal error" });
  }
};

exports.isAuthenticated = (req, res, next) => {
  // Check header or url parameters or post parameters for token
  var token = req.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required.",
    });
  }
  // Check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Invalid token.",
      });

    const { role: userRole , id: userId } = user;

    let User;
    switch (userRole) {
      case "admin":
        User = db.admins;
        break;
      case "worker":
        User = db.worker;
        break;
      case "student":
        User = db.student;
        break;
      default:
        return res.status(400).json({ error: "Invalid user type" });
    }

    User.findByPk(userId)
      .then((data) => {
        if (!user.id) {
          return res.status(401).json({
            error: true,
            message: "Invalid user.",
          });
        }
        req.user = data;
        next();
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error retrieving User with id=${userId}`, err,
        });
      });
  });
};
