const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
var exp = require('express-validator');
var validator = require('validator');

module.exports = function(app) {

   var users = require('../controllers/user.controller.js');

   /* Create new user
      Body: {
         userName: String,
         password: String
      }
   */
   app.post('/signup', function(req, res) {
      req.check('userName')
         .exists().withMessage('No username entered')
         .isLength({min: 1}).withMessage('Username too short')
         .check('password')
         .exists().withMessage('No password')
      
      var errors = req.validationErrors();
      
      if(errors.length == 0)
         users.signup(req, res);
      else {
         return res.status(400).send(errors);
      }
   });

   // Get all users
   app.get('/allUsers', users.getAllUsers);

   // Modify userName
   app.put('/users/:userId', users.modifyUserName);

   // Log in
   // app.post('/login', users.login);

   // Get self info
   // app.get('/me', users.getSelf);

   // Add friend
   // app.put('/addFriend', users.addFriend);
   // app.post('/friend', users.addFriend);

   // Remove friend
   // app.put('/deleteFriend', users.deleteFriend);
   // app.delete('/friend', users.deleteFriend);

   // Get all users
   // app.get('/users', users.getAll);

   // Retrieve all Notes
   // app.get('/notes', notes.findAll);

   // Retrieve a single Note with noteId
   // app.get('/notes/:noteId', notes.findOne);

   // Update a Note with noteId
   // app.put('/notes/:noteId', notes.update);

   // Delete a Note with noteId
   // app.delete('/notes/:noteId', notes.delete);
}