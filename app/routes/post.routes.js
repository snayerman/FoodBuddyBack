module.exports = function(app) {

   var posts = require('../controllers/post.controller.js');

   // Create new post
   app.post('/post', posts.newPost);

   // Delete post
   app.delete('/post/:id', posts.deletePost);

}