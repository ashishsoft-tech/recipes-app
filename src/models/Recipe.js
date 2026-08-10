const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe title is required"],
      trim: true,
      minlength: [2, "Recipe title must be at least 2 characters"],
      maxlength: [120, "Recipe title cannot exceed 120 characters"]
    },
    description: {
      type: String,
      required: [true, "Recipe description is required"],
      trim: true,
      minlength: [5, "Recipe description must be at least 5 characters"],
      maxlength: [1000, "Recipe description cannot exceed 1000 characters"]
    },
    ingredients: {
      type: [String],
      required: [true, "At least one ingredient is required"],
      validate: [
        {
          validator: (value) => Array.isArray(value) && value.length > 0,
          message: "At least one ingredient is required"
        },
        {
          validator: (value) =>
            value.every(
              (ingredient) =>
                typeof ingredient === "string" && ingredient.trim().length >= 2
            ),
          message: "Each ingredient must contain at least 2 characters"
        }
      ]
    },
    instructions: {
      type: String,
      required: [true, "Recipe instructions are required"],
      trim: true,
      minlength: [10, "Recipe instructions must be at least 10 characters"],
      maxlength: [5000, "Recipe instructions cannot exceed 5000 characters"]
    },
    prepTime: {
      type: Number,
      required: [true, "Preparation time is required"],
      min: [1, "Preparation time must be at least 1 minute"]
    },
    cookTime: {
      type: Number,
      required: [true, "Cooking time is required"],
      min: [0, "Cooking time cannot be negative"]
    },
    servings: {
      type: Number,
      required: [true, "Servings are required"],
      min: [1, "Servings must be at least 1"]
    },
    category: {
      type: String,
      trim: true,
      default: "General",
      maxlength: [50, "Category cannot exceed 50 characters"]
    },
    imageUrl: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
