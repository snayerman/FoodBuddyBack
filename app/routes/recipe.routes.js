module.exports = function(app) {
   var recipes = require('../controllers/recipe.controller.js');

   app.post('/recipe', recipes.searchForRecipes);
}