const express = require('express');
const router = express.Router();
const Storeitems =  require('../models/store');


/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    // Fetch all items from the database using await and async
    const items = await Storeitems.find({}, 'categoryName categoryDescription quantity subCategoryName divisionName divisions');

    // Pass the data to the EJS template
    res.render('dairypage', { title: 'Dairy', items: items });
  } catch (err) {
    next(err);
  }
});


// Route for handling delete request
router.delete('/dairy/:id', async (req, res) => {
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

   res.redirect('/dairy'); //maybe redirect elsewhere or  just have overlay
  } catch (err) {
    console.log(err);
    // Handle errors and display an error page or message
    res.redirect('/error');
  }
});

// Route for rendering the update form for a specific subcategory
router.get('/dairy/:id', async (req, res) => {
  const subCategoryId = req.params.id;

  try {
    const item = await Storeitems.findOne({ 'divisions.subCategories._id': subCategoryId });

    if (!item) {
      return res.redirect('/dairy'); // Subcategory not found, redirect back to the main page or display an error
    }

    const division = item.divisions.find((div) => div.subCategories.some((sub) => sub.id === subCategoryId));
    const subCategory = division.subCategories.find((sub) => sub.id === subCategoryId);

    res.render('updateform', { title: 'Update Subcategory', subCategory: subCategory });
  } catch (err) {
    console.log(err);
    // Handle errors and display an error page or message
    res.redirect('/error');
  }
});

// ... existing code ...

// Route for handling PUT request to update a specific subcategory
router.put('/dairy/:id', async (req, res) => {
  const subCategoryId = req.params.id;
  const { subcat, subcatDesc, quantity } = req.body;

  try {
    // Find the sub-category by its _id and update its properties in the database
    await Storeitems.updateOne(
      { 'divisions.subCategories._id': subCategoryId },
      {
        $set: {
          'divisions.$[].subCategories.$[subCat].subCategoryName': subcat,
          'divisions.$[].subCategories.$[subCat].subCategoryDescription': subcatDesc,
          'divisions.$[].subCategories.$[subCat].quantity': quantity,
        },
      },
      { arrayFilters: [{ 'subCat._id': subCategoryId }] }
    );

    console.log('update made');

    res.redirect('/'); // Redirect back to the main page or another page after updating
  } catch (err) {
    console.log(err);
    // Handle errors and display an error page or message
    res.redirect('/error');
  }
});


module.exports = router;
