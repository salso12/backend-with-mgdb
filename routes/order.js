var express = require('express');
var router = express.Router();

const {indexP, save} = require('./../controllers/orderControllers')

router.get('/', indexP );
router.post('/register', save );

module.exports = router;