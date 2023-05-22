const { createNewRecipe, getAllRecipes, getRecipeDetail, addRecipeIngredients, removeRecipeIngredients, updateRecipeInfo } = require("../controllers")

const recResolver = {
  Query: {

    getAllRecipes: (parent, args, context, info) => {
      const { Ingredient, Recipe } = context.db
      return getAllRecipes(Recipe).then(data => data)
    },

    getRecipeDetail: (parent, args, context, info) => {
      const { Recipe } = context.db
      const { recipeId } = args
      return getRecipeDetail(recipeId, Recipe).then(data => data)
    }
  },

  Mutation: {
    createNewRecipe: (parent, args, context, info) => {
      const { name, description, instructions, ingredients } = args
      const { Ingredient, Recipe } = context.db
      return createNewRecipe(args, Recipe, Ingredient)
        .then(data => data)
    },

    addRecipeIngredients: (parent, args, context, info) => {
      const { recipeId, items } = args
      const { Recipe, Ingredient } = context.db
      return addRecipeIngredients(+recipeId, items, Recipe, Ingredient).then(data => data)
    },

    removeRecipeIngredients: (parent, args, context, info) => {
      const { recipeId, ids } = args
      const { Recipe, Ingredient } = context.db
      return removeRecipeIngredients(+recipeId, ids, Recipe, Ingredient).then(data => data)
    },

    updateRecipeInfo: (parent, args, context, info) => {
      const { recipeId, name, description, instruction } = args
      const { Recipe } = context.db
      return updateRecipeInfo(+recipeId, name, description, instruction, Recipe).then(data => data)
    }
  }
}

module.exports = { recResolver }