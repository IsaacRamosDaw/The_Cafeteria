const bcrypt = require("bcryptjs");

const db = require("../models");

const Admin = db.admins;
const Student = db.student;
const Worker = db.worker;

const { login } = require("./site.controller");

exports.login = (req, res) => {
  if (req.session.user) {
    if (req.session.user.role == "admin") {
      return res.redirect("/admin");
    }

    if (req.session.user.role == "student") {
      return res.redirect("/student");
    }

    if (req.session.user.role == "worker") {
      return res.redirect("/worker");
    }
  }

  return res.render("login");
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.render("error", { message: "Username and password required" });

  try {
    let data = await login(username);
    // console.log(user);

    if (!data) return res.render("error", { message: "User not found" });

    // Validate the password
    const result = await bcrypt.compare(password, data.password);
    if (!result) return res.render("error", { message: "Password Incorrect" });

    req.session.user = {
      username: data.username,
      role: data.role,
      id: data.id,
    };

    console.log("User from auth.session: ", data);

    if (data.role == "admin") {
      return res.redirect("/admin");
    }

    if (data.role == "student") {
      return res.redirect("/student");
    }

    if (data.role == "worker") {
      return res.redirect("/worker");
    }
  } catch (err) {
    return res.render("error", {
      message: err.message || "Some error occurred while procesing signin",
    });
  }
};

exports.isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  next();
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);

      if (user.role == "admin") {
        return res.redirect("/admin");
      }

      if (user.role == "student") {
        return res.redirect("/student");
      }

      if (user.role == "worker") {
        return res.redirect("/worker");
      }
    }
  });

  res.clearCookie("connect.sid");

  res.redirect("/login");
};
