const { createTarea, viewTarea } = require('../controller/controller.tarea')
const router = require('express').Router()

router.post('/create-tarea', createTarea);
router.get('/tareas', viewTarea)

module.exports = router;