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
  }

  type Mutation {
    createNewRecipe(name:String!, description:String, instructions: String, ingredients:[String]): RecipeOutput

    addRecipeIngredients(id:Int!, items:[String!]!): RecipeOutput

    removeRecipeIngredients(id:Int!, items:[Int]): RecipeOutput
  }

  type RecipeOutput {
    recipe: Recipe
    error: String
    success: String
  }
`

module.exports = { recipeDefs }