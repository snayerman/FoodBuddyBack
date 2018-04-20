var axios = require('axios');

var dbConfig = require('../../config/database.config.js');
var key = dbConfig.key1;

var baseURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?';

var requestConfig = {
   method: 'POST',
   headers: {
      'X-Mashape-Key' : key
   }
}

//Ideally cache recipe results if not in mongodb
//only if not in db then do api call
exports.searchForRecipes = function(req, res) {
   //do checks to see if body has required params
   var body = req.body;
   var url = baseURL;

   /* Body should have:
         includeIngredients: [String]  //comma-seperated list of ingredients to include
         intolerances: [String]        //possible values: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.
         diet: [String]                //possible values: pescetarian, lacto vegetarian, ovo vegetarian, vegan, paleo, primal, and vegetarian
         excludeIngredients: [String]  //comma-seperated list of ingredients to exclude
   */
}
