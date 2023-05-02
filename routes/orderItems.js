var express = require('express');
var router = express.Router();

// inmort fonction from user controllers
const {index, order, show, update,dalete, patchh} = require('./../controllers/orderItemControllers')

/* GET users listing. */
router.get('/', index );
router.post('/register', order );
router.get('/:id', show );
router.put('/:id', update );
router.delete('/:id', dalete );
router.patch('/:id', patchh );


module.exports = router;