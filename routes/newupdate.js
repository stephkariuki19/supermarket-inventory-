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

        res.render('modifypage', { subcategory: subCategory }); // Render the 'modify.ejs' template with the subcategory data
    } catch (err) {
        console.log(err);
        // Handle errors and display an error page or message
        res.redirect('/error');
    }
});

// UPDATE route to update an item within a subcategory
router.put('/:id', async function (req, res, next) {
    console.log('PUT route accessed');
    try {
        const subCategoryId = req.params.id;
        const { subCategoryDescription,subCategoryName, quantity } = req.body;

        // Validate that required fields are present in the request body
        if (!subCategoryName || !subCategoryDescription || !quantity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const category = await Storeitems.findOne({ 'divisions.subCategories._id': subCategoryId });

        if (category) {
            const division = category.divisions.find(div => div.subCategories.some(sub => sub.id === subCategoryId));
            const subCategory = division.subCategories.find(sub => sub.id === subCategoryId);

            if (subCategory) {
                subCategory.subCategoryName = subCategoryName
                subCategory.subCategoryDescription = subCategoryDescription;
                subCategory.quantity = quantity;
                await category.save();
                return res.redirect('/cereal'); //redirects to homepage maybe should have an update made page and back 
            }
        }

        res.redirect('/'); // Handle the case where category or subcategory is not found,shd be error page
    } catch (err) {
        next(err);
    }
});


module.exports = router;
