var express = require('express');
var router = express.Router();
const storeController = require('../controllers/supermarketController');



/* displaying form*/
router.get('/', function(req, res, next) {
  res.render('form', { title: 'Form' });
});

//post request for form
router.post('/', storeController.super_create_post);


module.exports = router;
