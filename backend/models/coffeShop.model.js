const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CoffeShop = sequelize.define('CoffeShop', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adminId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Admins',
        key: 'id'
      }
    },
    schoolId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Schools',
        key: 'id'
      }
    },
    workerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Workers',
        key: 'id'
      }
    }
  }, {
    tableName: 'coffe_shops',
  });

  return CoffeShop;
}
