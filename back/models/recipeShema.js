const mongoose = require("mongoose");

const recipeShema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ type: String }],
  category: { type: String },
});

const Recipe = mongoose.model("Recipe", recipeShema);

module.exports = Recipe;
