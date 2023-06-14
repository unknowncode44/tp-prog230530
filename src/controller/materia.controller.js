const sequelize = require('../database/database')
const { Materia } = require('../models/model.materia')

const create = async (req, res) => {
    await Materia.sync()
    const materia = { name: req.body.name, professor_id: req.body.professor_id }
    const t = await sequelize.transaction()
    try {
        const result = await Materia.create({ name: materia.name, professor_id: materia.professor_id }, { transaction: t })
        res.status(201).json({
            ok: true,
            result,
            msg: 'created'
        })
        await t.commit()
    }
    catch(e) {
        res.status(500).json({
            ok: false,
            e,
            msg: 'rejected'
        })
        await t.rollback()
    }
}

const inscription = async (req, res) => {
    const id = req.params.id
    const professor_id = req.body.professor_id
    const t = await sequelize.transaction()
    try {
        const result = await Materia.update(
            { professor_id: professor_id },
            { where: { id: id } },
            { transaction: t }
        )
        res.status(200).json({
            ok: true,
            result,
            msg: 'approved'
        })
        await t.commit()
    }
    catch(e) {
        res.status(500).json({
            ok: false,
            e,
            msg: 'rejected'
        })
        await t.rollback()
    }
}

const getMaterias = async (req, res) => {
    try {
        const result = await Materia.findAll()
        res.status(200).json({
            ok: true,
            result,
            msg: 'approved'
        })
    }
    catch(e){
        res.status(500).json({
            ok: false,
            e,
            msg: 'rejected'
        })
    }
}

module.exports = { create, inscription, getMaterias }