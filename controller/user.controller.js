import { User, sequelize } from '../models/Model.user'

const loginUser = async (req, res) => {
    await User.sync()

    const { user, password } = req.body;

    const userDetails = {
        user,
        password
    }
    try {
        const user = await User.create(userDetails)
        console.log(tarea)
        res.status(201).json({
            ok: true,
            msg: 'Logeado'
        })

    }
    catch (e) {
        res.status(500).json({
            ok: false,
            e,
            msg: 'rejected'
        })
    }
}
module.exports = {
    loginUser
}