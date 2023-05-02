var express = require('express');
var router = express.Router();

// inmort fonction from user controllers
const {index,register,login} = require('./../controllers/userController')

/* GET users listing. */
router.get('/', index );
router.post('/register', register );
router.post('/login', login );

module.exports = router;
