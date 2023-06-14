const {registerUser, loginUser, getUsers, update } = require('../controller/user.controller')

/* GET users listing. */
const router = require('express').Router();

router.post('/users/register', registerUser)
router.post('/users/login', loginUser)
router.get('/users', getUsers)
router.put('/users/:id', update)

module.exports = router;
