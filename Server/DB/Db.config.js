const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, null, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
  pool: { max: 5, min: 0, idle: 10000 },
});

module.exports = db;
