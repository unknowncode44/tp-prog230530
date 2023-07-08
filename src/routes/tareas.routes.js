const { createTarea, viewTarea, getTarea } = require('../controller/tarea.controller')
const router = require('express').Router()

router.post('/tarea', createTarea);
router.get('/tarea', viewTarea)
router.get('/tarea/:id', getTarea)

module.exports = router;