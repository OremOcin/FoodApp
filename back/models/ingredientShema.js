const mongoose = require("mongoose");

const ingredientShema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
  },
});

const Ingredient = mongoose.model("Ingredient", ingredientShema);

module.exports = Ingredient;
