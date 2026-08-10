const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const recipeRoutes = require("./routes/recipeRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Recipes API is running",
    endpoints: {
      health: "/health",
      recipes: "/api/recipes"
    }
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/recipes", recipeRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
