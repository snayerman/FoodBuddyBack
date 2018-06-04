var axios = require('axios');

var dbConfig = require('../../config/database.config.js');
var key = dbConfig.key1;

// var baseURLSearch = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?';
// var baseURLRecipe = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/{id}/information?includeInformation=true';
var baseURLRecipe = 'http://api.yummly.com/v1/api/recipe/';
var baseURLSearch = 'http://api.yummly.com/v1/api/recipes?q=';

var requestConfig = {
   method: 'GET',
   url: baseURLSearch,
   headers: {
      'X-Yummly-App-ID'  : 'be689a06',
      'X-Yummly-App-Key' : '70a209fc691fa12d4680059a253febb2'
      // 'X-Mashape-Key' : key
   }
}

//Ideally cache recipe results if not in mongodb
//only if not in db then do api call
exports.searchForRecipes = function(req, res) {
   var url = baseURLSearch+req.url.split("?")[1];
   requestConfig.url = url;

   axios(requestConfig).then(recipes => {
      return res.status(200).send(recipes.data);
   }).catch(err => {
      console.log("err", err);
      return res.status(400).send(err);
   })
   // var url = baseURLSearch+req.url.split("?")[1];
   // requestConfig.url = url;

   // axios(requestConfig).then(recipes => {
   //    return res.status(200).send(recipes.data);
   // }).catch(err => {
   //    console.log("err", err);
   //    return res.status(400).send(err);
   // }) 
}

exports.getRecipeById = function(req, res) {
   var id = req.params.id;
   var url = baseURLRecipe + id;
   // console.log(id);

   requestConfig.url = url;

   axios(requestConfig).then(recipe => {
      return res.status(200).send(recipe.data);
   }).catch(err => {
      console.log("err", err);
      return res.status(400).send(err);
   })
}
