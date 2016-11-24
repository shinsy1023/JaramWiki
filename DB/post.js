var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var postSchema = new Schema({
	_id : Schema.Types.ObjectId,
	title : String
});

module.exports = mongoose.model('post', postSchema);