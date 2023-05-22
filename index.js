const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express")

const { sequelize, startDatabaseConnection } = require("./models")
const { typeDefs } = require("./schema_gql")
const { resolvers } = require("./resolvers")

const app = express()
const port = 4000

// demo info
const fakeDb = [{ id: 1, name: "Apple2" }, { id: 2, name: "Banana" }]

/**
 * @desc Starts apollo server at given port
 * @param typeDefs: graphql typeDefs string
 * @param resolvers: graphql resolvers object
 * @param db: database information
 */
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

/**
 * @desc Connect to database and 
 * - calls start apollo server function
 */
startDatabaseConnection().then(async () => {
  await sequelize.sync()

  startApolloServer().catch(err => {
    console.log("Error while starting apollo server")
    console.log(err)
  })
})

