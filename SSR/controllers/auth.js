const bcrypt = require("bcryptjs");
const db = require("../models");

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
    const result = await bcrypt.compare(password, user.password);
    if (!result) return res.status(401).json({ error: "Incorrect password" });

    console.log("User from auth.session: ", user);

    if (user.role == "admin") {
      return res.redirect("/admin");
    }

    if (user.role == "student") {
      return res.redirect("/student");
    }

    if (user.role == "worker") {
      return res.redirect("/worker");
    }
  }catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  };
};

exports.isAuthenticated = (req, res, next) => {
  
};