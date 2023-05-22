const { gql } = require("apollo-server-express")

const { ingredientDefs } = require("./ingredientSchema")
const { recipeDefs } = require("./recipeSchema")

const typeDefs = gql`
  ${ingredientDefs}
  ${recipeDefs}
`

module.exports = { typeDefs }