const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : {type : String, required : true},
    body : {type : String, required : true},
    device : {type : String, enum : ['MOBILE', 'TABLET', 'PC'], required : true},
    userID : {type : String, required : true}
})

const PostModel = mongoose.model('post', postSchema);

module.exports = PostModel;