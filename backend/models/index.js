const dbConfig = require("../config/db.config")

const sequelize = new Sequalize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAlieses: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  }
});

const db = {};
db.sequelize = sequelize;

db.coffeShop = require("./coffeShop.model.js")(sequelize);
db.admin = require("./admin.model.js")(sequelize);
db.student = require(".student.model.js")(sequelize);
db.worker = require("./worker.model.js")(sequelize);
db.course = require("./course.model.js")(sequelize);
db.product = require("./product.model.js")(sequelize);
db.order = require("./order.model.js")(sequelize);
db.categories = require("./menu.categories.js")(sequelize);

module.exports = db;