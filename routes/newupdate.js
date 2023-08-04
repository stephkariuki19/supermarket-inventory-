const express = require('express');
const router = express.Router();
const Storeitems = require('../models/store'); // Import your model

router.get('/:id', async (req, res) => {
    const subCategoryId = req.params.id;
  
    try {
        const item = await Storeitems.findOne({ 'divisions.subCategories._id': subCategoryId });

        if (!item) {
            return res.redirect('/'); // Subcategory not found, redirect back to the main page or display an error
        }

        const division = item.divisions.find((div) => div.subCategories.some((sub) => sub.id === subCategoryId));
        const subCategory = division.subCategories.find((sub) => sub.id === subCategoryId);

        res.render('modify', { subCategory: subCategory }); // Render the 'modify.ejs' template with the subcategory data
    } catch (err) {
        console.log(err);
        // Handle errors and display an error page or message
        res.redirect('/error');
    }
});

module.exports = router;
