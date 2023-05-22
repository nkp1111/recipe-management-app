const {
  createNewRecipe,
  getAllRecipes,
  getRecipeDetail,
  addRecipeIngredients,
  removeRecipeIngredients,
  updateRecipeInfo,
  deleteRecipe,
} = require("./recipe")

const { updateIngredientInfo } = require("./ingredient")

module.exports = { createNewRecipe, getAllRecipes, getRecipeDetail, addRecipeIngredients, removeRecipeIngredients, updateRecipeInfo, deleteRecipe, updateIngredientInfo }