const { gql } = require("apollo-server-express")

const recipeDefs = gql`
  type Recipe {
    id: ID!
    name: String!
  }

  type Query {
    getAllRecipes: [Recipe]
  }
`

module.exports = { recipeDefs }