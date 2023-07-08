const jwt = require('jsonwebtoken');
const JWT_SECRET = `${process.env.JWT_SECRET}`


const tokenSign = async (id_user, confirmedemail) => {
    const payload = {
        id: id_user,
        email: confirmedemail
    }
    const sign = jwt.sign(payload,
    JWT_SECRET,
    {
        expiresIn: "24h", // Expiration time
    });
    // Return generated token
    return sign
}

module.exports = {
    tokenSign
}