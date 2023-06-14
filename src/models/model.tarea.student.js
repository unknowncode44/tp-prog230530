const { Model, DataTypes } = require('sequelize') //? Sequelize for ORM
const sequelize = require('../database/database')
const { User } = require('./model.user')
const { Tarea } = require('./model.tarea')
const { Materia } = require('./model.materia')

class StudentTarea extends Model {  }

// Relational table:
StudentTarea.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        /** Foreign keys of users and tarea */
        student_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },
        tarea_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Tarea,
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
        modelName: 'StudentTarea'
    }
)

module.exports = { StudentTarea }