const { DataTypes } = require("sequelize")

const { sequelize } = require("./connection")
const { Ingredient } = require("./ingredientSchema")

const Recipe = sequelize.define("Recipe", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING(300),
  },
  instructions: DataTypes.STRING,
}, {

})

Recipe.hasMany(Ingredient, {
  foreignKey: "recipeId",
  as: "ingredients"
})

Ingredient.belongsTo(Recipe, {
  foreignKey: "recipeId"
})

module.exports = { Recipe }