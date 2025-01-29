const envConfig = require("./config");

module.exports = {
  HOST: envConfig.host,
  USER: envConfig.username,
  PASSWORD: envConfig.password,
  DB: envConfig.database,
  dialect: envConfig.dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};