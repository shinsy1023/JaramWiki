var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var historySchema = new Schema({
	_id : Schema.Types.ObjectId,
	content : String,
	date : { type: Date, default: Date.now },
	postId : Schema.Types.ObjectId
});

module.exports = mongoose.model('history', historySchema);