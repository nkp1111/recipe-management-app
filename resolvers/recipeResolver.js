const recResolver = {
  Query: {
    getAllRecipes: (parent, args, context, info) => {
      return context.db
    }
  }
}

module.exports = { recResolver }