var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var historySchema = new Schema({
	contents : String,
	date : { type: Date, default: Date.now },
	postId : Schema.Types.ObjectId,
	rev: Number
});

module.exports = mongoose.model('history', historySchema);