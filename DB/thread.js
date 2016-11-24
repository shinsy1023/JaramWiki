var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var threadSchema = new Schema({
	_id : Schema.Types.ObjectId,
	title : String,
	flag : Boolean,
	postId : Schema.Types.ObjectId
});

module.exports = mongoose.model('thread', threadSchema);