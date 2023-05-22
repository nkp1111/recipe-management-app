const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express")

const app = express()
const port = 4000

// demo info
const fakeDb = [{ id: 1, name: "Apple" }, { id: 2, name: "Banana" }]
const typeDefs = gql`
  type Recipe {
    id: ID!
    name: String!
  }

  type Query {
    getAllRecipes: [Recipe]
  }
`
const resolvers = {
  Query: {
    getAllRecipes: (parent, args, context, info) => {
      console.log(context.db)
      return context.db
    }
  }
}

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { db: fakeDb }
  })

  await server.start()

  server.applyMiddleware({ app })

  app.listen({ port }, () => {
    console.log(`Server listening on port ${port}`)
  })
}

startApolloServer().catch(err => {
  console.log("Error while starting apollo server")
  console.log(err)
})