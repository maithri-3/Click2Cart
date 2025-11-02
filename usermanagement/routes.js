const express = require('express');
const router = express.Router();
const  { register , login , logout, get_user }  = require('./controller.js');

router.post('/register', register); 
router.post('/login', login); 
router.post('/logout', logout);
router.post('/get_user', get_user);


module.exports = router;