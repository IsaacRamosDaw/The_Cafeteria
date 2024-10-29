const { DataTypes } = require("sequelize")
const { sequelize } = require(".")

module.exports = (sequelize) => {
  const coffeShop = sequelize.define(() => {
    id: {
      type: DataTypes.STRING
      primaryKey: true
    }
    name: {
      type: DataTypes.STRING
    }
    admin: {
      type: DataTypes.INTEGER
      references: {
        model: 'admin.model.js'
        key: 'id'
      }
    }
    school: {
      type: DataTypes.INTEGER
      regerences: {
        model: 'school.model.js'
        key: 'id'
      }
    }
    worker: {
      type: DataTypes.INTEGER
      regerences: {
        model: 'worker.model.js'
        key: 'id'
      }
    }
  });
  return coffeShop;
}