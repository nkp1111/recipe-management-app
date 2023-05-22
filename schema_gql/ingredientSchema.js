const { gql } = require("apollo-server-express")

const ingredientDefs = gql`
  type Ingredient {
    id: ID!
    name: String!
    quantity: Int
    description: String
  }

  type Mutation {
    updateIngredientInfo (recipeId: Int!, ingredientId:Int!, name:String, quantity:Int, description:String): IngredientUpdateOutput
  }

  type IngredientUpdateOutput {
    error: String,
    success: String,
  }
`

module.exports = { ingredientDefs }