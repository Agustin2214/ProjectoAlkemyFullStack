
const { Sequelize,DataTypes } = require('sequelize');

const db = require("../db/connection")



const users = db.define('users',{
    uid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
  
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : true,
    },
}
)


module.exports = users;

  