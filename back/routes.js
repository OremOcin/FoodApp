const express = require("express");
const router = express.Router();
const Ingredient = require("./models/ingredientShema");
const Recipe = require("./models/recipeShema");

router.get("/", (req, res) => {
  res.send("Hello world");
});

router.post("/saveIngredient", (req, res) => {
  const { name } = req.body;

  const newIngredient = new Ingredient({
    nom: name,
  });
  newIngredient
    .save()
    .then((savedIngredient) => {
      res.status(201).json(savedIngredient);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/viewIngredients", (req, res) => {
  Ingredient.find()
    .then((ingredients) => {
      res.status(200).json(ingredients);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/viewRecipes", (req, res) => {
  Recipe.find()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.delete("/deleteIngredient/:id", (req, res) => {
  const ingredientId = req.params.id;

  Ingredient.findByIdAndDelete(ingredientId)
    .then((deleteIngredient) => {
      if (!deleteIngredient) {
        return res
          .status(404)
          .json({ message: "L'ingrédient n'a pas été trouvé" });
      }
      res
        .status(200)
        .json({ message: "L'ingrédient a été supprimé avec succès" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.delete("/deleteRecipe/:id", (req, res) => {
  const recipeId = req.params.id;

  Recipe.findByIdAndDelete(recipeId)
    .then((deleteRecipe) => {
      if (!deleteRecipe) {
        return res
          .status(404)
          .json({ message: "La recette n'a pas été trouvée" });
      }
      res
        .status(200)
        .json({ message: "L'ingrédient a été supprimé avec succès" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/saveNewRecipe", (req, res) => {
  const { title, ingredients, category } = req.body;

  const newRecipe = new Recipe({
    title: title,
    ingredients: ingredients,
    category: category,
  });
  newRecipe
    .save()
    .then((savedRecipe) => {
      res.status(201).json(savedRecipe);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/searchRecipes", async (req, res) => {
  const ingredientIds = req.query.ingredients.split(",");
  try {
    const recipes = await Recipe.find({ ingredients: { $all: ingredientIds } });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
