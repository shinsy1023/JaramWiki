var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var postSchema = new Schema({
	title : String,
	rev: Number
});

module.exports = mongoose.model('post', postSchema);