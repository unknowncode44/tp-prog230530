const { Tarea, sequelize} = require('../models/Model.tarea')

const createTarea = async (req, res) => {
    await Tarea.sync()
    console.log('toyaqui')
    const { title, description } = req.body;
    const transaction = await sequelize.transaction() //! Manejo de transacciones para consultas

    console.log(title,description)

    const newTarea = {
        title,
        description
    }
    try {
        const tarea = await Tarea.create(newTarea)
        console.log(tarea)
        res.status(201).json({
            ok: true,
            msg: 'Creado con exito'
        });
        await transaction.commit() // Si todo OK, commitea los cambios

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
    await Tarea.sync()
    console.log('voy aca')
    
    const transaction = await sequelize.transaction()

    try {
        const tarea = await Tarea.findAll();

        res.status(201).json({
            ok:true,
            tarea
        })
    }catch (e) {

    }
}
module.exports = {createTarea, viewTarea}