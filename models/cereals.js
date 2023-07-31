const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  categoryDescription: { type: String },
  divisions: [
    {
    //the kinds of cereals
      divisionName: { type: String, required: true },
      // the brands
      subCategories: [
        {
          subCategoryName: { type: String, required: true },
          subCategoryDescription: { type: String },
          quantity: { type: String, required: true }
        }
      ],
    }
  ],
});

const Cereal = mongoose.model('Cereal', itemSchema);

module.exports = Cereal;
