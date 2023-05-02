var express = require('express');
var router = express.Router();
const multer  = require('multer')
const path = require('path')

// inmort fonction from user controllers
const {indexP} = require('./../controllers/productControllers')
const {show} = require('./../controllers/productControllers')
const {save} = require('./../controllers/productControllers')
const {update} = require('./../controllers/productControllers')
const {dalete} = require('./../controllers/productControllers')
const {patchh} = require('./../controllers/productControllers')
const {search} = require('./../controllers/productControllers')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/../public/images`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix+path.extname(file.originalname)  )
    }
  })
  
  const upload = multer({ storage: storage});
  

/* GET users listing. */
router.get('/', indexP );
router.get('/search', search );
router.get('/:id', show );
router.post('/', upload.single('thumbnail'), save)
router.put('/:id', update );
router.delete('/:id', dalete );
router.patch('/:id', patchh );

module.exports = router;
