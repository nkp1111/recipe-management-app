const { createNewRecipe, getAllRecipes } = require("../controllers")

const recResolver = {
  Query: {
    getAllRecipes: (parent, args, context, info) => {
      const { Ingredient, Recipe } = context.db
      return getAllRecipes(Recipe).then(data => data)
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
      console.log(args)
      return 1
    }
  }
}

module.exports = { recResolver }