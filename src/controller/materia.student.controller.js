const { MateriaStudent } = require('../models/model.materia.student')
const sequelize = require('../database/database')
const { Materia } = require('../models/model.materia')

const inscription = async (req, res) => {
    const inscription = { student_id: req.body.student_id, materia_id: req.body.materia_id }
    const transaction = await sequelize.transaction()
    try {
        MateriaStudent.sync()
        
        const result = await MateriaStudent.create(inscription)
        res.status(200).json({
            ok: true,
            result,
            msg: 'approved'
        })
        await transaction.commit()
    }
    catch(e) {
        res.status(500).json({
            ok: false,
            e,
            msg: 'rejected'
        })
        transaction.rollback()
    }
}

const update = async (req, res) => {
    const id = req.params.id
    const inscription = { student_id: req.body.student_id, materia_id: req.body.materia_id }
    const transaction = await sequelize.transaction()
    try {
        const result = await MateriaStudent.update(
            { inscription }, 
            { where: { id: id } },
            { transaction: transaction }
        )
        res.status(200).json({
            ok: true,
            result,
            msg: 'approved'
        })
        await transaction.commit()
    }
    catch(e) {
        res.status(500).json({
            ok: false,
            e,
            msg: 'rejected'
        })
        await transaction.rollback()
    }
}

const unsubscribe = async (req, res) => {
    const id = req.params.id
    const transaction = await sequelize.transaction()
    try {
        const result = await MateriaStudent.destroy(
            { where: { id: id } }, 
            { transaction: transaction }
        )
        res.status(200).json({
            ok: true,
            result,
            msg: 'approved'
        })
        await transaction.commit()
    }
    catch(e) {
        res.status(200).json({
            ok: false,
            e,
            msg: 'rejected'
        })
        await transaction.rollback()
    }
}

const getInscriptions = async (req, res) => {
    const id = req.params.id
    try {
        const result = await MateriaStudent.findAll(
            //Inner join
            { include: { model: Materia, required: true, as: 'Materia' } },
            { where: { student_id: id } }
        )
        res.status(200).json({
            ok: true,
            result,msg: 'approved'
        })
    }
    catch(e) {
        res.status(500).json({
            ok: false,
            e,
            msg: 'rejected'
        })
    }
}

module.exports = { inscription, update, unsubscribe, getInscriptions }