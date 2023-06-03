const { Router} = require('express');
const {createTarea, viewTarea} = require('../controller/controller.tarea')

const router = Router();
router.post('/create-tarea', createTarea);
router.get('/tareas', viewTarea)

module.exports = router;