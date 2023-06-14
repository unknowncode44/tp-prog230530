const { createTarea, viewTarea } = require('../controller/tarea.controller')
const router = require('express').Router()

router.post('/create-tarea', createTarea);
router.get('/tareas', viewTarea)

module.exports = router;