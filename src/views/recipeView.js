function recipeResponse(recipe) {
  return {
    id: recipe._id,
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    servings: recipe.servings,
    category: recipe.category,
    imageUrl: recipe.imageUrl,
    createdAt: recipe.createdAt,
    updatedAt: recipe.updatedAt
  };
}

function recipesResponse(recipes) {
  return recipes.map(recipeResponse);
}

module.exports = {
  recipeResponse,
  recipesResponse
};
