const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  categoryName: { type: String, 
    enum: [ "cereal", "bakery", "produce","fruits","dairy"],
    lowercase: true,
    required: true },
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

const Storeitems = mongoose.model('Storeitems', itemSchema);

module.exports = Storeitems;
