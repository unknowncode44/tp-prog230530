const { inscription, update, unsubscribe, getInscriptions } = require('../controller/inscription.controller')

const router = require('express').Router()

router.get('/inscriptions/:id', getInscriptions)
router.post('/inscriptions', inscription)
router.delete('/inscriptions/:id', unsubscribe)
router.put('/inscriptions/:id', update)

module.exports = router