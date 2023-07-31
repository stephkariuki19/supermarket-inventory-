const express = require('express');
const storeController = require('../controllers/supermarketController');

const router = express.Router();

router.get('/create', function (req, res, next) {
  res.render('form to be here');
});

// Use POST instead of GET to handle form submission
//router.post('/create', storeController.cereal_create_post);

module.exports = router;
