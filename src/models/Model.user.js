const { Model, DataTypes } = require('sequelize') //? Sequilize para ORM
const sequelize = require('../database/database')

//? Model class
class User extends Model {}

// Table creation
User.init(
    {
        // COLUMNS:
        id: {
            type: DataTypes.INTEGER, // ---> Data type int
            primaryKey: true, // ---> Primary key
            autoIncrement: true // ---> auto_increment
        },
        email: {
            type: DataTypes.STRING, // ---> Data type string
            allowNull: false
        },
        password: {
            type: DataTypes.STRING, // ---> Data type string
            allowNull: false // ---> not null
        },
    }, {
        sequelize,
        modelName: 'User' //! Model name
    }
)

module.exports = { User }