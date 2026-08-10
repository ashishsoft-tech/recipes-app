require("dotenv").config();

const connectDB = require("../src/config/db");
const Recipe = require("../src/models/Recipe");

const sampleRecipes = [
  {
    title: "Classic Vegetable Pasta",
    description: "A quick and colorful pasta made with seasonal vegetables.",
    ingredients: [
      "200g pasta",
      "1 onion, chopped",
      "1 bell pepper, sliced",
      "2 tomatoes, chopped",
      "2 tbsp olive oil",
      "Salt and black pepper"
    ],
    instructions:
      "Cook the pasta until al dente. Saute onion and bell pepper in olive oil, add tomatoes, season well, and combine with the drained pasta.",
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    category: "Main Course",
    imageUrl: ""
  },
  {
    title: "Banana Pancakes",
    description: "Soft pancakes made with ripe bananas and simple pantry ingredients.",
    ingredients: [
      "1 ripe banana",
      "1 egg",
      "100g flour",
      "100ml milk",
      "1 tsp baking powder",
      "1 tsp sugar"
    ],
    instructions:
      "Mash the banana and mix with egg and milk. Add flour, baking powder, and sugar. Cook small portions on a lightly greased pan until golden on both sides.",
    prepTime: 5,
    cookTime: 15,
    servings: 2,
    category: "Breakfast",
    imageUrl: ""
  }
];

async function seed() {
  try {
    await connectDB();
    await Recipe.deleteMany({});
    const inserted = await Recipe.insertMany(sampleRecipes);
    console.log(`Seeded ${inserted.length} recipes successfully.`);
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
}

seed();
