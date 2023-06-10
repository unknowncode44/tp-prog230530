const { Sequelize } = require('sequelize') //? Sequilize para ORM
const config = require('../config')
const sequelize = new Sequelize(
    config.database, // ---> instanciamos la base de datos
    config.user, // ---> le pasamos el nombre de usuario
    config.password,  // ---> y la contraseña
    {
        host: config.host, // ---> el host para la conexion
        dialect:'mysql',
        dialectModule: require('mysql2'),
        port: config.port
    }
)

//! Para probar la conexion a la base de datos:
async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log('Conectado a la base de datos');
    }
    catch(e) {
        console.log(e);
    }
}

testConnection()

module.exports = sequelize