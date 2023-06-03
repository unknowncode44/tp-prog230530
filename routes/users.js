const { Router} = require('express');
const {registerUser, loginUser, getUsers } =require('../controller/user.controller')
/* GET users listing. */

const router = Router();
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getUsers', getUsers)

module.exports = router;
