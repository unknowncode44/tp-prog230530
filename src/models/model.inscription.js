const { Model, DataTypes } = require('sequelize') //? Sequelize for ORM
const sequelize = require('../database/database')
const { User } = require('./model.user')
const { Materia } = require('./model.materia')

class Inscriptions extends Model {  }

Inscriptions.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        student_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },
        materia_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Materia,
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'Inscriptions'
    }
)
User.belongsToMany(Materia, { through: Inscriptions })
Materia.belongsToMany(User, { through: Inscriptions })

module.exports = { Inscriptions }