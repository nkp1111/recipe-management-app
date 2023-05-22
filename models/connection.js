const { Sequelize } = require("sequelize")
require("dotenv").config()

const user = process.env.POSTGRES_USER
const password = process.env.POSTGRES_PASSWORD
const dbName = process.env.POSTGRES_DB_NAME
const host = process.env.POSTGRES_HOST
const port = process.env.POSTGRES_PORT

// // in development
// const sequelize = new Sequelize(dbName, user, password, {
//   host,
//   port,
//   dialect: "postgres",
//   dialectModule: require("pg")
// })


// in production
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialectModule: require('pg'),
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }
})

const startDatabaseConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log("Database connected")
  } catch (error) {
    console.log("Error connecting to Database")
    console.log(error)
  }
}

module.exports = { sequelize, startDatabaseConnection }