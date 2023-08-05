const express = require('express');
const router = express.Router();
const Storeitems =  require('../models/store');


/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    // Fetch all items from the database using await and async
    const items = await Storeitems.find({}, 'categoryName categoryDescription quantity subCategoryName divisionName divisions');

    // Pass the data to the EJS template
    res.render('producepage', { title: 'Produce', items: items });
  } catch (err) {
    next(err);
  }
});

// Route for handling delete request
router.delete('/delete/:id', async (req, res) => {
  const subCategoryId = req.params.id;
  const divisionId = req.params.id

  try {
    // Find the sub-category by its _id and remove it from the database
    await Storeitems.updateOne(
      { 'divisions.subCategories._id': subCategoryId },
      { $pull: { 'divisions.$[].subCategories': { _id: subCategoryId } } }
    );

    await Storeitems.updateOne(
      { 'divisions._id': divisionId },
      { $pull: { 'divisions': { _id: divisionId } } }
    );


    console.log('delete made');

   res.redirect('/produce'); //maybe redirect elsewhere or  just have overlay
  } catch (err) {
    console.log(err);
    // Handle errors and display an error page or message
    res.redirect('/error');
  }
});


module.exports = router;
