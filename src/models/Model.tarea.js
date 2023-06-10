const { Model, DataTypes } = require('sequelize') //? Sequelize para ORM
const sequelize = require('../database/database')

//? Model class
class Tarea extends Model {}

// Table creation
Tarea.init(
    {
        // COLUMNS:
        id: {
            type: DataTypes.INTEGER, // ---> Data type int
            primaryKey: true, // ---> primary key
            autoIncrement: true // ---> auto_increment
        },
        title: {
            type: DataTypes.STRING, // ---> Data type string
            allowNull: false
        },
        description: {
            type: DataTypes.STRING, // ---> Data type string
            allowNull: false // ---> not null
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pendiente'
        },
    }, {
        sequelize,
        modelName: 'Tarea' //! Model name
    }
)


module.exports = { Tarea }