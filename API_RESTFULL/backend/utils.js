var jwt = require("jsonwebtoken");

function generateToken(user) {
  if (!user) return null;
  const u = {
    id: user.id,
    name: user.username,
    role: user.role,
  };
  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24,
  });
}

function getCleanUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    name: user.username,
    role: user.role,
  };
}

module.exports = {
  generateToken,
  getCleanUser,
};
