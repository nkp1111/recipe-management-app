const { DataTypes } = require("sequelize")

const { sequelize } = require("./connection")

const Ingredient = sequelize.define("Ingredient", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  description: DataTypes.STRING
})

module.exports = { Ingredient }