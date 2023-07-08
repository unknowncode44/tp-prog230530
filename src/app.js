const express = require('express')

//* Routes import:
const tareaRoute = require('./routes/tareas.routes')
const userRoute = require('./routes/users.routes')
const materiaRoute = require('./routes/materia.routes')
const inscriptionsRoute = require('./routes/inscriptions.routes')

const app = express()

//* Cors
app.use(require('cors')())

//* Settings
app.set('port', 3000)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//* Middlewares
app.use(require('morgan')('dev'))

//* Routes directions:
app.use(
  //? Routes:
  tareaRoute,
  userRoute,
  materiaRoute,
  inscriptionsRoute
)

module.exports = app