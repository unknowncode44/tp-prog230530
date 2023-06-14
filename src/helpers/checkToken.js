const jwt = require('jsonwebtoken')

const  verifyToken = async (token)=> {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (e) {
        msg: 'Error al verificar el token'
    }
}
module.exports = {
    verifyToken
}