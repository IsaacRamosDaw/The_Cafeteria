const db = require("../models");
const Student = db.student;
const Admin = db.admins;
const Worker = db.worker;

exports.login = async (u) => {
  let user = await Admin.findOne({ where: { username: u } });
  if (user) {
    return user;
  }

  user = await Worker.findOne({ where: { username: u } });
  if (user) {
    return user;
  }

  user = await Student.findOne({ where: { username: u } });
  if (user) {
    return user;
  }

  return null;
}