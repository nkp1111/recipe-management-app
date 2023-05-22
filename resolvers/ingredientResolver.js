const { updateIngredientInfo } = require("../controllers")

const ingResolvers = {
  Mutation: {
    updateIngredientInfo: (parent, args, context, info) => {
      const { recipeId, ingredientId, name, description, quantity } = args
      const { Recipe, Ingredient } = context.db

      return updateIngredientInfo(recipeId, ingredientId, name, description, quantity, Recipe, Ingredient).then(data => data)
    },
  }
}

module.exports = { ingResolvers }