const Sequelize = require("sequelize");

const connection = new Sequelize('guiapress', 'root', 'linux', {
    host:'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = connection;