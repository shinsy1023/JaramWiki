var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var postSchema = new Schema({
	title : String
});

module.exports = mongoose.model('post', postSchema);