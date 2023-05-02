var express = require('express');
var router = express.Router();

// inmort fonction from user controllers
const {indexP} = require('./../controllers/categoryControllers')
const {show} = require('./../controllers/categoryControllers')
const {save} = require('./../controllers/categoryControllers')
const {update} = require('./../controllers/categoryControllers')
const {dalete} = require('./../controllers/categoryControllers')
const {patchh} = require('./../controllers/categoryControllers')

/* GET users listing. */
router.get('/', indexP );
router.get('/:id', show );
router.post('/', save)
router.put('/:id', update );
router.delete('/:id', dalete );
router.patch('/:id', patchh );

module.exports = router;