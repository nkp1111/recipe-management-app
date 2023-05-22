const { ingResolvers } = require("./ingredientResolver")
const { recResolver } = require("./recipeResolver")

const resolvers = {
  Query: {
    ...ingResolvers.Query,
    ...recResolver.Query,
  },
  Mutation: {
    ...ingResolvers.Mutation,
    ...recResolver.Mutation,
  }
}

module.exports = { resolvers }