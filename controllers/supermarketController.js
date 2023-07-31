const CerealItem = require('../models/cereals');

const cereal_create_post = (req, res) => {
  const { cat, catDesc, div, subcat, subcatDesc, quantity } = req.body;

  const cerealItem = new CerealItem({
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

  cerealItem.save()
    .then(result => {
      // Redirect to a success page or display a success message
      console.log('Post was successful');
      res.redirect('/success');
    })
    .catch(err => {
      console.log(err);
      // Handle errors and display an error page or message
      res.redirect('/error');
    });
};

module.exports ={
  cereal_create_post
}