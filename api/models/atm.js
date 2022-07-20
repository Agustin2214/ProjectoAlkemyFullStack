
const { Sequelize,DataTypes } = require('sequelize');

const db = require("../db/connection")



const atm = db.define('atm',{
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
    type:{
        type: DataTypes.ENUM('add', 'substract'),
        allowNull: false,
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },  
    value:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : true,
    },
}
)


module.exports = atm;