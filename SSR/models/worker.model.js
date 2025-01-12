const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Worker = sequelize.define("Worker", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "worker"
    }, 
    filename:{
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  });

  return Worker;
};

