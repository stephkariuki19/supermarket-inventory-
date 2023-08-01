const express = require('express');
const router = express.Router();
const Storeitems =  require('../models/store');


/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    // Fetch all items from the database using await and async
    const items = await Storeitems.find({}, 'categoryName categoryDescription quantity subCategoryName divisionName divisions');

    // Pass the data to the EJS template
    res.render('fruitspage', { title: 'Fruits', items: items });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
