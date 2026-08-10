const Recipe = require("../models/Recipe");
const asyncHandler = require("../utils/asyncHandler");
const validateObjectId = require("../utils/validateObjectId");
const { recipeResponse, recipesResponse } = require("../views/recipeView");

const createRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.create(req.body);

  res.status(201).json({
    success: true,
    message: "Recipe created successfully",
    data: recipeResponse(recipe)
  });
});

const getAllRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: recipes.length,
    data: recipesResponse(recipes)
  });
});

const getRecipeById = asyncHandler(async (req, res) => {
  if (!validateObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid recipe ID"
    });
  }

  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return res.status(404).json({
      success: false,
      message: "Recipe not found"
    });
  }

  res.status(200).json({
    success: true,
    data: recipeResponse(recipe)
  });
});

const updateRecipe = asyncHandler(async (req, res) => {
  if (!validateObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid recipe ID"
    });
  }

  const recipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!recipe) {
    return res.status(404).json({
      success: false,
      message: "Recipe not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Recipe updated successfully",
    data: recipeResponse(recipe)
  });
});

const deleteRecipe = asyncHandler(async (req, res) => {
  if (!validateObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid recipe ID"
    });
  }

  const recipe = await Recipe.findByIdAndDelete(req.params.id);

  if (!recipe) {
    return res.status(404).json({
      success: false,
      message: "Recipe not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Recipe deleted successfully",
    data: recipeResponse(recipe)
  });
});

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
};
