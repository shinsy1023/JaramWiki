var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	_id : Schema.Types.ObjectId,
	content : String,
	date : { type: Date, default: Date.now },
	writerId : Schema.Types.ObjectId,
	threadId : Schema.Types.ObjectId
});

module.exports = mongoose.model('comment', commentSchema);