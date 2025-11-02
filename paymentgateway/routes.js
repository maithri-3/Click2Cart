const express = require('express');
const router = express.Router();
const  {    add_order ,get_orders ,add_payment, remove_from_cart, delete_order  }  = require('./controller.js');


router.post('/add_order', add_order); 
router.post('/get_orders', get_orders); 
router.post('/add_payment', add_payment); 
router.post('/remove_from_cart', remove_from_cart);
router.post('/delete_order', delete_order);
 
module.exports = router;
