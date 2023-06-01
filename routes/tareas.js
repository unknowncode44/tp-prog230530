const { Router} = require('express');
const {createTarea} = require('../controller/controller.tarea')

const router = Router();
router.post('createTarea', createTarea);

module.exports = router;