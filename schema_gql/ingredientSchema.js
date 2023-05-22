const { gql } = require("apollo-server-express")

const ingredientDefs = gql`
  type Ingredient {
    id: ID!
    name: String!
    quantity: Int
    description: String
  }
`

module.exports = { ingredientDefs }