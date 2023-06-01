require()
const { Sequelize, Model, DataTypes } = require('sequelize') //? Sequilize para ORM

const sequelize = new Sequelize(
    process.env.DB_NAME.database, // ---> instanciamos la base de datos
    process.env.DB_USER.user, // ---> le pasamos el nombre de usuario
    process.env.DB_PASSWORD.password,  // ---> y la contraseña
    {
        host: process.env.DB_HOST, // ---> el host para la conexion
        dialect: "mysql", // ---> el tipo de motor de busqueda
        port: process.env.DB_PORT
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
        user: {
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