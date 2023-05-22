const { gql } = require("apollo-server-express")

const recipeDefs = gql`
  type Recipe {
    id: ID!
    name: String!
    description: String
    instructions: String
    ingredients: [Ingredient]
  }

  type Query {
    getAllRecipes: [Recipe]

    getRecipeDetail(recipeId: Int!): RecipeOutput
  }

  type Mutation {
    createNewRecipe(name:String!, description:String, instructions: String, ingredients:[String]): RecipeOutput

    addRecipeIngredients(recipeId:Int!, items:[String!]!): RecipeOutput

    removeRecipeIngredients(recipeId:Int!, ids:[Int]): RecipeOutput

    updateRecipeInfo(recipeId: Int!, name: String, description:String, instruction: String): RecipeOutput

    deleteRecipe(recipeId: Int!): RecipeOutput
  }

  type RecipeOutput {
    recipe: Recipe
    error: String
    success: String
  }
`

module.exports = { recipeDefs }