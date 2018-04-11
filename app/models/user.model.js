var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
   userName: String,
   password: String
});

module.exports = mongoose.model('User', UserSchema);






































// var friendsSchema = mongoose.Schema({
//    userName: String
// }, { _id : false });

// var postSchema = mongoose.Schema({
//    author: String,
//    category: String,
//    content: String,
//    friend: String
// });

// var UserSchema = mongoose.Schema({
//    userName: String,
//    password: String,
//    friends: [String],
//    posts: [postSchema]
// }, {
//     timestamps: true
// });

// module.exports = mongoose.model('User', UserSchema);