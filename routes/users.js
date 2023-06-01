const { Router} = require('express');
const {registerUser, loginUser } =require('../controller/user.controller')
/* GET users listing. */

const router = Router();
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/get-users',)

module.exports = router;
