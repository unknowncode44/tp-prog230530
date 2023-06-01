var express = require('express');
var { Router} = require('express');
const router = Router();
/* GET users listing. */
router.post('/register', function(req, res, next) {
  res.send('registro');
});
router.get('/login', function(req, res, next) {
  res.send('login');
});
router.post('/login', function(req, res, next) {
  res.send('login');
});

module.exports = router;
