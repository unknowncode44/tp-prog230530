const { User } = require('../models/model.user')
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
            // Get user password
            const hashPass = user.getDataValue('password')
            //Compare password
            const validatePass = bcrypt.compareSync(password.toString(), hashPass)
            if (!validatePass) {
                res.status(404).json({
                    ok: false,
                    msg: 'Incorrect password!'
                })
            }
            //Get email
            const confirmedemail = user.email
            //User id
            const id_user = user.id
            //Generate the token
            const token = await tokenSign(id_user,confirmedemail)
            res.status(200).json({
                ok: true,
                msg: 'Successful login',
                token,
                data: user
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
    const { email, password, role } = req.body;
    const transaction = await sequelize.transaction() //! Handle transactions
    try {
        //? Password encrypt
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password.toString(), salt)
        const user = await User.findOrCreate({
            where: { email },
            defaults: {
                email: email,
                password: passwordHash,
                role: role
            },
            transaction: transaction
        })
        const confirmedemail = user.email
        const id_user = user.id
        const token = await tokenSign(id_user,confirmedemail)
        res.status(201).json({
            ok: true,
            msg: 'User created',
            token
        })
        await transaction.commit() // Changes commit
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
        const users = await User.findAll() // Get all users
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

const update = async (req, res) => {
    const id = req.params.id
    // If the values are undefined, don't update the data
    const user = { email: req.body.email, password: req.body.password, role: req.body.role }
    console.log(user, id);
    const t = await sequelize.transaction()
    try {
        const result = await User.update(
            { user },
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

module.exports = {
    loginUser,
    registerUser,
    getUsers,
    update
}