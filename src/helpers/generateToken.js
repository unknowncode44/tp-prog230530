const jwt = require('jsonwebtoken');
const JWT_SECRET = `${process.env.JWT_SECRET}`


const tokenSign = async (id_user, confirmedemail) => {
    const sign = jwt.sign({
        id: id_user,
        email: confirmedemail
    },
    JWT_SECRET,
    {
        expiresIn: "24h",
    });
    //Lo retornamos 
    console.log(sign)
    return sign
};
module.exports = {
    tokenSign
}