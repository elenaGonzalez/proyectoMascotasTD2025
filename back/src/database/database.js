const {Sequelize} =  require('sequelize');
require('dotenv').config({quiet: true});

const database = process.env.DB;
const username = process.env.USER;
const password = process.env.PASSWORD; 

const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;