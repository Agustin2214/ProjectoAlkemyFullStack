const Sequelize = require('sequelize')

const db = new Sequelize('alkemyproject','postgres','12345678',{
    host: 'localhost',
    dialect: 'postgres',
    //loggin: false,
});
 
module.exports = db