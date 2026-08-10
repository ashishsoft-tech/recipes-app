# Recipes API Documentation

## POST /api/recipes
Creates a recipe. Returns `201 Created`.

## GET /api/recipes
Returns all recipes. Returns `200 OK`.

## GET /api/recipes/:id
Returns one recipe. Returns `200 OK`, `400 Bad Request` for invalid IDs, or `404 Not Found`.

## PUT /api/recipes/:id
Updates a recipe. Returns `200 OK`, `400 Bad Request`, or `404 Not Found`.

## DELETE /api/recipes/:id
Deletes a recipe. Returns `200 OK`, `400 Bad Request`, or `404 Not Found`.

See `Recipes_API.postman_collection.json` for ready-to-import requests, examples, and test behavior.
