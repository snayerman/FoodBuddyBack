const { check, validationResult, oneOf } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

module.exports = function(app) {
   var recipes = require('../controllers/recipe.controller.js');

   app.post('/recipe', function(req, res) {
      var errors = req.validationErrors();
      
      if(!errors || errors.length == 0)
         recipes.searchForRecipes(req, res);
      else {
         return res.status(400).send(errors);
      }
   });

   app.get('/recipe/:recipeId', function(req, res) {
      oneOf([
         req.check('recipeId')
            .exists().withMessage('No recipe ID provided'),
         req.check('recipeId').isNumeric().withMessage("Not a valid ID")
      ]);

      var errors = req.validationErrors();

      if(!errors || errors.length == 0)
         recipes.getRecipeById(req, res);
      else {
         return res.status(400).send(errors);
      }
   })
}