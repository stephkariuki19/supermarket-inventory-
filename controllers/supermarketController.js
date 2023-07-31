const SuperItem = require('../models/store');

const super_create_post = (req, res) => {
  const { cat, catDesc, div, subcat, subcatDesc, quantity } = req.body;

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
            quantity: quantity
          }
        ],
      }
    ],
  });

  superItem.save()
    .then(result => {
      // Redirect to a success page or display a success message
      console.log('Post was successful');
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      // Handle errors and display an error page or message
      res.redirect('/error');
    });
};

module.exports ={
  super_create_post
}