const dbConfig = require("../config/db.config.js")
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

db.admins = require("./admin.model.js")(sequelize);
db.worker = require("./worker.model.js")(sequelize);
db.student = require("./student.model.js")(sequelize);
db.wallet = require("./wallet.model.js")(sequelize);
db.school = require("./school.model.js")(sequelize);
db.course = require("./course.model.js")(sequelize);
db.categories = require("./categories.model.js")(sequelize);
db.product = require("./product.model.js")(sequelize);
db.order = require("./order.model.js")(sequelize);
db.coffeShop = require("./coffeShop.model.js")(sequelize);
// db.inventory = require("./inventory.model.js")(sequelize);
// db.orderLine = require("./orderLine.model.js")(sequelize);

//! FK 

//* TABLE STUDENT
/** ID - COURSE */ db.student.belongsTo(db.course, {foreingKey: 'courseId'});

//* TABLE WALLET
/** ID - STUDENT */ db.wallet.belongsTo(db.student, {onDelete: 'cascade', foreingKey: 'studentId'});

//* TABLE ORDER
/** ID - STUDENT */ db.order.belongsTo(db.student, {foreingKey: 'studentId'});
/** ID - PRODUCT */ db.order.belongsTo(db.product, {foreingKey: 'productId'});

//* TABLE PRODUCT
/** ID - PRODUCT */ db.product.belongsTo(db.categories, {onDelete: 'cascade', foreingKey: 'categoryId'});

// // TABLE WORKER
// db.worker.hasMany(db.coffeShop, {foreingKey: 'coffeShopId'});
// db.worker.belongsTo(db.coffeShop, {onDelete: 'cascade', foreingKey: 'coffeShopId'});

// // TABLE ORDERLINE
// db.orderLine.belongsTo(db.product, {foreingKey: 'product'});
// db.orderLine.belongsTo(db.order, {foreingKey: 'order'});

// // TABLE SCHOOL
// db.school.hasMany(db.course, {foreingKey: 'school'});
// db.school.hasMany(db.coffeShop, {foreingKey: 'school'});
// db.school.belongsTo(db.admins, {foreingKey: 'adminId'});

// // TABLE COFFE SHOP
// db.coffeShop.belongsTo(db.school, {foreingKey: 'school'});

module.exports = db;