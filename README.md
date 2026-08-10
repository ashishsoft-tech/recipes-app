# 3 - Node.js CRUD API

A complete **Recipes CRUD REST API** built with:

- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman
- MVC architecture

The project implements:

- `createRecipe`
- `getAllRecipes`
- `getRecipeById`
- `updateRecipe`
- `deleteRecipe`

## 1. Project structure

```text
recipes-app/
├── postman/
│   ├── Recipes_API.postman_collection.json
│   └── Recipes_Local.postman_environment.json
├── scripts/
│   └── seed.js
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── recipeController.js
│   ├── middlewares/
│   │   └── errorMiddleware.js
│   ├── models/
│   │   └── Recipe.js
│   ├── routes/
│   │   └── recipeRoutes.js
│   ├── utils/
│   │   ├── asyncHandler.js
│   │   └── validateObjectId.js
│   ├── views/
│   │   └── recipeView.js
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## 2. MVC architecture

- **Model:** `src/models/Recipe.js` contains the Mongoose schema and database model.
- **View:** `src/views/recipeView.js` controls the JSON representation returned by the API.
- **Controller:** `src/controllers/recipeController.js` contains all CRUD business logic.
- **Routes:** `src/routes/recipeRoutes.js` maps HTTP methods and URLs to controllers.
- **Middleware:** centralized 404 and error handling.

## 3. Recipe fields

| Field | Type | Required | Rules |
|---|---|---:|---|
| title | String | Yes | 2-120 characters |
| description | String | Yes | 5-1000 characters |
| ingredients | String[] | Yes | At least one ingredient |
| instructions | String | Yes | 10-5000 characters |
| prepTime | Number | Yes | Minimum 1 minute |
| cookTime | Number | Yes | Minimum 0 minutes |
| servings | Number | Yes | Minimum 1 |
| category | String | No | Defaults to General |
| imageUrl | String | No | Optional |

## 4. API endpoints

Base URL:

```text
http://localhost:5000/api/recipes
```

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/recipes` | Create recipe |
| GET | `/api/recipes` | Get all recipes |
| GET | `/api/recipes/:id` | Get one recipe |
| PUT | `/api/recipes/:id` | Update recipe |
| DELETE | `/api/recipes/:id` | Delete recipe |
| GET | `/health` | Server health check |

## 5. Requirements

Install:

1. Node.js 18 or newer
2. MongoDB locally, or a MongoDB Atlas database
3. Postman
4. Git

## 6. Run locally

### Step 1 - install dependencies

```bash
npm install
```

### Step 2 - create environment file

Copy `.env.example` to `.env`.

Example:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/recipes_db
NODE_ENV=development
```

For MongoDB Atlas, use your Atlas connection string:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@YOUR-CLUSTER.mongodb.net/recipes_db?retryWrites=true&w=majority
```

Do not commit `.env` to GitHub.

### Step 3 - start server

Development:

```bash
npm run dev
```

Production-style:

```bash
npm start
```

You should see:

```text
MongoDB connected: ...
Recipes API running on port 5000
```

Open:

```text
http://localhost:5000/health
```

Expected:

```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "..."
}
```

## 7. Seed sample data

After configuring MongoDB:

```bash
npm run seed
```

This inserts two sample recipes.

## 8. Postman

Import these files into Postman:

```text
postman/Recipes_API.postman_collection.json
postman/Recipes_Local.postman_environment.json
```

Select the **Recipes API - Local** environment.

The Create Recipe request automatically saves the returned recipe ID into the `recipeId` collection variable. Then you can run:

1. Create Recipe
2. Get All Recipes
3. Get Recipe By ID
4. Update Recipe
5. Delete Recipe

The collection also includes example responses and error cases.

## 9. Sample Create request

```http
POST /api/recipes
Content-Type: application/json
```

```json
{
  "title": "Paneer Butter Masala",
  "description": "Creamy Indian paneer curry with tomato and butter.",
  "ingredients": [
    "250g paneer",
    "2 tomatoes",
    "1 onion",
    "2 tbsp butter",
    "100ml cream"
  ],
  "instructions": "Cook the onion and tomatoes, blend into a sauce, add butter and spices, then simmer paneer with cream.",
  "prepTime": 15,
  "cookTime": 25,
  "servings": 4,
  "category": "Indian",
  "imageUrl": ""
}
```

## 10. Error handling

The API handles:

- Missing required fields
- Invalid field values
- Invalid MongoDB ObjectIds
- Recipe not found
- Mongoose validation errors
- Duplicate-key errors
- Unknown routes
- Unexpected server errors

Example:

```json
{
  "success": false,
  "message": "Recipe not found"
}
```

## 11. Deploy to Render

### A. Push to GitHub

```bash
git init
git add .
git commit -m "Create Recipes CRUD API"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/recipes-app.git
git push -u origin main
```

Do not push `.env`.

### B. Create Render Web Service

Create a new Web Service from your GitHub repository.

Use:

```text
Build Command: npm install
Start Command: npm start
```

Set environment variables in Render:

```text
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=production
```

`PORT` does not need to be hard-coded because the application reads Render's `PORT` environment variable automatically.

After deployment, test:

```text
https://YOUR-RENDER-SERVICE.onrender.com/health
```

API base:

```text
https://YOUR-RENDER-SERVICE.onrender.com/api/recipes
```

In Postman, change `baseUrl` to your deployed API.

## 12. MongoDB Atlas notes

If using Atlas:

1. Create a free MongoDB cluster.
2. Create a database user.
3. Add the required IP access rule.
4. Copy the application connection string.
5. Put it into `MONGODB_URI`.
6. Never publish the username/password in GitHub.

## 13. Submission checklist

- [ ] CRUD APIs working
- [ ] MongoDB connected
- [ ] MVC folder structure included
- [ ] Validation included
- [ ] Error handling included
- [ ] Postman collection included
- [ ] Postman sample responses included
- [ ] README included
- [ ] `.env` excluded from Git
- [ ] Code pushed to GitHub
- [ ] Server deployed on Render
- [ ] Render `/health` endpoint tested
- [ ] Render `/api/recipes` endpoint tested

## 14. Important

The application code is complete, but a real MongoDB connection string is environment-specific. Before running or deploying, configure `MONGODB_URI` with your local MongoDB or MongoDB Atlas connection string.

Never commit credentials to GitHub.
