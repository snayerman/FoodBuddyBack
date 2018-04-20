var axios = require('axios');

var dbConfig = require('../../config/database.config.js');
var key = dbConfig.key3;

var baseURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?';

var requestConfig = {
   method: 'GET',
   url: baseURL,
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
  if(body.includeIngredients && body.includeIngredients.length > 0) {
     url += 'includeIngredients=';
     body.includeIngredients.map(function(ingredient, idx) {
        url += body.includeIngredients.length - idx > 1 ? `${ingredient}%2C` : `${ingredient}&`;
     })
  }

   if(body.intolerances && body.intolerances.length > 0) {
      url += 'intolerances=';
      body.intolerances.map(function(intolerance, idx) {
         url += body.intolerances.length - idx > 1 ? `${intolerance}%2C` : `${intolerance}&`;
      })
   }

   if(body.diet && body.diet.length > 0) {
      url += 'diet=';
      body.diet.map(function(diet, idx) {
         url += body.diet.length - idx > 1 ? `${diet}%2C` : `${diet}&`;
      })
   }

   if(body.excludeIngredient && body.excludeIngredient.length > 0) {
      url += 'excludeIngredients=';
      body.excludeIngredient.map(function(ingredient, idx) {
         url += body.excludeIngredient.length - idx > 1 ? `${ingredient}%2C` : `${ingredient}&`;
      })
   }

   // console.log(url);

   requestConfig.url = url;

   console.log(requestConfig);

   axios(requestConfig).then(recipes => {
      return res.send(recipes.data);
   }).catch(err => {
      console.log("err", err);
   })
}
