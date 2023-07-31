var express = require('express');
var router = express.Router();
const Storeitems =  require('../models/store');


/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    // Fetch all items from the database using await and async
    const items = await Storeitems.find({}, 'categoryName');

    // Pass the data to the EJS template
    res.render('index', { title: 'Express', items: items });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
