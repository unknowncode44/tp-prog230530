const { Model, DataTypes } = require('sequelize') //? Sequelize for ORM
const sequelize = require('../database/database')
const { User } = require('./model.user')

class Materia extends Model {  }

Materia.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        professor_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'Materia'
    }
)
Materia.hasOne(User) // One-To-One relation

module.exports = { Materia }