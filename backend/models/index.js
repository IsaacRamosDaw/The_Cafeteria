const dbConfig = require("../config/holadb.config.js")
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
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
db.admins = require("./admin.model.js")(sequelize);
db.student = require("./student.model.js")(sequelize);
db.worker = require("./worker.model.js")(sequelize);
db.course = require("./course.model.js")(sequelize);
db.product = require("./product.model.js")(sequelize);
db.order = require("./order.model.js")(sequelize);
db.categories = require("./categories.model.js")(sequelize);
db.school = require("./school.model.js")(sequelize);
db.wallet = require("./wallet.model.js")(sequelize);
db.inventory = require("./inventory.model.js")(sequelize);
db.orderLine = require("./orderLine.model.js")(sequelize);

// TABLA COFFE SHOP
db.coffeShop.belongsTo(db.admins, {foreingKey: 'admin'});
db.coffeShop.belongsTo(db.product, {foreingKey: 'product'});
db.coffeShop.belongsTo(db.worker, {foreingKey: 'worker'});
db.coffeShop.belongsTo(db.school, {foreingKey: 'school'});

// TABLA STUDENT
db.student.hasMany(db.order, {foreingKey: 'student'});
db.student.belongsTo(db.course, {foreingKey: 'course'});

// TABLA COURSE
db.course.hasMany(db.student, {foreingKey: 'course'});

// TABLA SCHOOL
db.school.hasMany(db.course, {foreingKey: 'school'});
db.school.hasMany(db.coffeShop, {foreingKey: 'school'});

// TABLA ADMIN
db.admins.hasMany(db.coffeShop, {foreingKey: 'admin'});

// TABLA WORKER
db.worker.hasMany(db.coffeShop, {foreingKey: 'worker'});

// TABLA PRODUCT
db.product.hasMany(db.orderLine, {foreingKey: 'product'});
db.product.hasMany(db.coffeShop, {foreingKey: 'product'});
db.product.belongsTo(db.categories, {foreingKey: 'categories'});

// TABLA WALLET
db.wallet.hasMany(db.student, {foreingKey: 'wallet'});

// TABLA CATEGORY
db.categories.hasMany(db.product, {foreingKey: 'categories'});

// TABLA ORDER
db.order.belongsTo(db.student, {foreingKey: 'student'});

// TABLA ORDERLINE
db.orderLine.belongsTo(db.product, {foreingKey: 'product'});
db.orderLine.belongsTo(db.order, {foreingKey: 'order'});

module.exports = db;