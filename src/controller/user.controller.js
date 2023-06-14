const { User } = require('../models/Model.user')
const sequelize = require('../database/database')
const bcrypt = require('bcryptjs')
const { tokenSign } = require('../helpers/generateToken')


const loginUser = async (req, res) => {
    await User.sync()
    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user === null) {
            res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        } else {
            
            const hashPass = user.getDataValue('password')

            const validatePass = bcrypt.compareSync(password.toString(), hashPass)
            if (!validatePass) {
                res.status(404).json({
                    ok: false,
                    msg: 'Incorrect password!'
                })
            }
            const confirmedemail = user.email
            const id_user = user.id
            const token = await tokenSign(id_user,confirmedemail)
            res.status(200).json({
                ok: true,
                msg: 'Successful login',
                token
            })

        }

    } catch (e) {
        res.status(500).json({
            ok: false,
            msg: 'Server error',
            e
        })
    }
}
const registerUser = async (req, res) => {
    await User.sync()

    const { email, password } = req.body;
    const transaction = await sequelize.transaction() //! Handle transactions

    try {
        //? Password encrypt
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password.toString(), salt)
        
        const user = await User.findOrCreate({
            where: { email },
            defaults: {
                email: email,
                password: passwordHash
            },
            transaction: transaction
        })
        await transaction.commit() // Changes commit
        const confirmedemail = user.email
        const id_user = user.id
        const token = await tokenSign(id_user,confirmedemail)
        res.status(201).json({
            ok: true,
            msg: 'User created',
            token
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
            msg: 'Error'
        })
    }
}


module.exports = {
    loginUser,
    registerUser,
    getUsers
}