const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });


const config = {
  development: {
    username: process.env.USER || "root",
    password: process.env.PASSWORD || null,
    database: process.env.SCHEMA || "wondersofwords_dev",
    host: process.env.HOST || "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: process.env.USER || "root",
    password: process.env.PASSWORD || null,
    database: process.env.SCHEMA || "wondersofwords_test",
    host: process.env.HOST || "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.USER || "root",
    password: process.env.PASSWORD || null,
    database: process.env.SCHEMA || "wondersofwords_prod",
    host: process.env.HOST || "127.0.0.1",
    dialect: "mysql"
  }
};

module.exports = config;


