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

// // TABLA COFFE SHOP
// db.coffeShop.hasMany(db.admins, { foreingKey: 'coffeShopId' });
// db.coffeShop.belongsTo(db.admins, {foreingKey: 'adminId'});
// db.coffeShop.belongsTo(db.product, {foreingKey: 'productId'});
// db.coffeShop.belongsTo(db.worker, {foreingKey: 'workerId'});
// db.coffeShop.belongsTo(db.school, {foreingKey: 'schoolId'})

// // TABLA STUDENT
// db.student.hasMany(db.order, {foreingKey: 'studentId'});
// db.student.belongsTo(db.course, {foreingKey: 'courseId'});
// db.student.belongsTo(db.wallet, {foreingKey: 'walletId'});

// // TABLA COURSE
db.student.belongsTo(db.course, { foreingKey: 'courseId' });

// // TABLA SCHOOL
// db.school.hasMany(db.course, {foreingKey: 'schoolId'});
// db.school.hasMany(db.coffeShop, {foreingKey: 'schoolId'});

// // TABLA ADMIN
// db.admins.hasMany(db.coffeShop, {foreingKey: 'adminId'});

// // TABLA WORKER
// db.worker.hasMany(db.coffeShop, {foreingKey: 'workerId'});

// // TABLA PRODUCT
// db.product.hasMany(db.orderLine, {foreingKey: 'productId'});
// db.product.hasMany(db.coffeShop, {foreingKey: 'productId'});
// db.product.belongsTo(db.categories, {foreingKey: 'categoriesId'});

// // TABLA WALLET
// db.wallet.hasMany(db.student, {foreingKey: 'walletId'});

// // TABLA CATEGORY
// db.categories.hasMany(db.product, {foreingKey: 'categoriesId'});

// // TABLA ORDER
// db.order.belongsTo(db.student, {foreingKey: 'studentId'});

// // TABLA ORDERLINE
// db.orderLine.belongsTo(db.product, {foreingKey: 'productId'});
// db.orderLine.belongsTo(db.order, {foreingKey: 'orderId'});

module.exports = db;