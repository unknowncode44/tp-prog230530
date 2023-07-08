const { Tarea } = require('../models/model.tarea')
const sequelize = require('../database/database');
const { StudentTarea } = require('../models/model.tarea.student');
const { Materia } = require('../models/model.materia');
const { User } = require('../models/model.user');

const createTarea = async (req, res) => {
    await Tarea.sync({ force: true })
    const { title, description } = req.body;
    const transaction = await sequelize.transaction() //! Transactions
    // Create object
    const newTarea = {
        title,
        description
    }
    try {
        const tarea = await Tarea.create(newTarea)
        res.status(201).json({
            ok: true,
            msg: 'approved'
        });
        await transaction.commit() // Commit
    }
    catch (e) {
        res.status(500).json({
            ok: false,
            e,
            msg: 'rejected'
        })
    }
}
const viewTarea = async (req, res)=> {
    try {
        await Tarea.sync()
        const tarea = await Tarea.findAll();
        res.status(201).json({
            ok:true,
            tarea
        })
    }catch (e) {
        res.status(500).json({
            ok: false,
            e,
            msg: 'error'
        })
    }
}

const getTarea = async (req, res) => {
    const user_id = req.params.id
    try {
        const result = await Tarea.findAll(
            { include: [{ model: StudentTarea, 
                include: [{ model: Tarea, 
                    include: [{ model: Materia, 
                        include: [{ model: User, as: 'U' }] }] }] }]}, { where: { 'U.id': user_id } }
        )
        res.status(200).json({
            ok: true,
            result,
            msg: 'approved'
        })
    }
    catch(e) {
        res.status(200).json({
            ok: false,
            e,
            msg: 'rejected'
        })
    }
}

const updateTarea = async (req, res) => {
    const id = req.params.id //Parameters
    // Can change the score by the professor
    const { title, description, score } = req.body //Body
    const transaction = await sequelize.transaction() // Begin transaction
    try {
        
        const result = await Tarea.update({ title, description, score /* Object update*/ }, {
            where: {
                id: id // Queries parameters
            }
        }, { transaction: transaction })
        res.status(200).json({
            ok: true,
            result,
            msg: 'approved'
        })
        await transaction.commit() // Commit
    }
    catch(e) {
        res.status(500).json({
            ok: false,
            e,
            msg: 'rejected'
        })
        await transaction.rollback() // Rollback in case of error
    }
}

const deleteTarea = async (req, res) => {
    const id = req.params.id //Parameter
    const transaction = await sequelize.transaction() // Begin transaction
    try {
        const result = await Tarea.destroy({
            where: {
                id: id //Queries params
            }
        }, { transaction: transaction })
        res.status(200).json({
            ok: true,
            result,
            msg: 'approved'
        })
        await transaction.commit() //Commit
    }
    catch(e) {
        res.status(200).json({
            ok: false,
            e,
            msg: 'rejected'
        })
        await transaction.rollback() // Rollback in case of error
    }
}

module.exports = { createTarea, viewTarea, updateTarea, deleteTarea, getTarea }