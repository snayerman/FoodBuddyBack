const { check, validationResult, oneOf } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

module.exports = function(app) {
   var recipes = require('../controllers/recipe.controller.js');

   app.post('/recipe', function(req, res) {
      // oneOf([
      //    req.check('includeIng')
      //       .exists().withMessage('No username entered')
      //       .isLength({min: 1}).withMessage('Username too short'),
      //    req.check('password')
      //       .exists().withMessage('No password entered')
      //       .isLength({min: 5}).withMessage('Password too short')
      //    ]
      // );
      var errors = req.validationErrors();
      
      if(!errors || errors.length == 0)
         recipes.searchForRecipes(req, res);
      else {
         return res.status(400).send(errors);
      }
   });
}