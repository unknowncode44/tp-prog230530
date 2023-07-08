const { Inscriptions } = require('../models/model.inscription')
const sequelize = require('../database/database')
const { Materia } = require('../models/model.materia')

const inscription = async (req, res) => {
    const inscription = { student_id: req.body.student_id, materia_id: req.body.materia_id }
    const transaction = await sequelize.transaction()
    try {
        Inscriptions.sync({ force: true })
        
        const result = await Inscriptions.create(inscription)
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
        const result = await Inscriptions.update(
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
        const result = await Inscriptions.destroy(
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
        const result = await Inscriptions.findAll(
            //Inner join
            { include: Materia }
        )
        res.status(200).json({
            ok: true,
            result,
            msg: 'approved'
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