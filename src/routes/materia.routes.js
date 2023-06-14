const router = require('express').Router()
const { create, inscription, getMaterias } = require('../controller/materia.controller')

router.post('/materia', create)
router.put('/materia/:id', inscription)
router.get('/materia', getMaterias)

module.exports = router