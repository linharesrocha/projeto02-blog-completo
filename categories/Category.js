const Sequelize = require("sequelize");
const connection = ("../database/databse");

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STIRNG,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Category;