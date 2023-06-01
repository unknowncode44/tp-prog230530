const { User, sequelize } = require('../models/Model.user')
const bcrypt = require('bcrypt')

const loginUser = async (req, res) => {
    await User.sync()
    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user === null) {
            res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        } else {
            console.log('pase el if de nulo')
            const hashPass = user.getDataValue('password')

            const validatePass = bcrypt.compareSync(password.toString(), hashPass)
            if (!validatePass) {
                res.status(404).json({
                    ok: false,
                    msg: 'Contraseña incorrecta!'
                })
            }
            res.status(200).json({
                ok: true,
                msg: 'Usuario logeado'
            })

        }

    } catch (e) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
            e
        })
    }
}
const registerUser = async (req, res) => {
    await User.sync()

    const { email, password } = req.body;
    const transaction = await sequelize.transaction() //! Manejo de transacciones para consultas

    try {
        //? Encriptamos la contraseña
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password.toString(), salt)
        const userDetails = {
            email,
            passwordHash
        }
        const user = await User.findOrCreate({
            where: { email },
            defaults: {
                email: email,
                password: passwordHash
            },
            transaction: transaction
        })
        await transaction.commit() // Si todo OK, commitea los cambios
        res.status(201).json({
            ok: true,
            msg: 'Usuario creado con exito',
            user
        })

    } catch (e) {
        res.status(500).json({
            ok: false,
            e
        })

    }
}

const getUsers = async (req, res) => {
    await User.sync()

    const transaction = await sequelize.transaction();

    try {
        const users = await User.findAll();

        res.status(201).json({
            ok: true,
            users
        })
    }

    catch (e) {
        res.status(500).json({
            ok: false,
            e,
            msg: 'error'
        })
    }
}


module.exports = {
    loginUser,
    registerUser,
    getUsers
}