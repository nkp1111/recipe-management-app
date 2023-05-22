const { sequelize, startDatabaseConnection } = require("./connection")
const { Ingredient } = require("./ingredientSchema")
const { Recipe } = require("./recipeSchema")

module.exports = {
  sequelize,
  startDatabaseConnection,
  Ingredient,
  Recipe,
}