const { Sequelize, Model, DataTypes } = require('sequelize') //? Sequilize para ORM
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

//? Creamos la clase para el modelo
class User extends Model {}

//Creamos la tabla
User.init(
    {
        // COLUMNAS:
        id: {
            type: DataTypes.INTEGER, // ---> tipo de dato int
            primaryKey: true, // ---> llave primaria
            autoIncrement: true // ---> auto_increment
        },
        email: {
            type: DataTypes.STRING, // ---> tipo de dato string
            allowNull: false
        },
        password: {
            type: DataTypes.STRING, // ---> tipo de dato string
            allowNull: false // ---> not null
        },
    }, {
        sequelize,
        modelName: 'User' //! El nombre del modelo
    }
)

module.exports = { User, sequelize }