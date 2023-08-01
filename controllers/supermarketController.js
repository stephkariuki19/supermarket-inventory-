const SuperItem = require('../models/store');

const super_create_post = async (req, res) => {
  const { cat, catDesc, div, subcat, subcatDesc, quantity } = req.body;

  try {
    // Check if the category exists in the database
    let existingCategory = await SuperItem.findOne({ categoryName: cat });

    if (existingCategory) {
      // If the category exists, check if the division exists under the category
      let existingDivision = existingCategory.divisions.find(
        (division) => division.divisionName === div
      );

      if (existingDivision) {
        // If the division exists, add the new sub-category to the existing division
        existingDivision.subCategories.push({
          subCategoryName: subcat,
          subCategoryDescription: subcatDesc,
          quantity: quantity,
        });
      } else {
        // If the division doesn't exist, create a new division with the sub-category
        existingCategory.divisions.push({
          divisionName: div,
          subCategories: [
            {
              subCategoryName: subcat,
              subCategoryDescription: subcatDesc,
              quantity: quantity,
            },
          ],
        });
      }

      // Save the updated category in the database
      await existingCategory.save();
    } else {
      // If the category doesn't exist, create a new document
      const superItem = new SuperItem({
        categoryName: cat,
        categoryDescription: catDesc,
        divisions: [
          {
            divisionName: div,
            subCategories: [
              {
                subCategoryName: subcat,
                subCategoryDescription: subcatDesc,
                quantity: quantity,
              },
            ],
          },
        ],
      });

      // Save the new category in the database
      await superItem.save();
    }

    // Redirect to a success page or display a success message
    console.log('Post was successful');
    res.redirect('/');
  } catch (err) {
    console.log(err);
    // Handle errors and display an error page or message
    res.redirect('/error');
  }
};

module.exports = {
  super_create_post,
};
