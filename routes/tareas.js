const { Router} = require('express');
const {createTarea} = require('../controller/controller.tarea')

const router = Router();
router.post('/create-tarea', createTarea);

module.exports = router;