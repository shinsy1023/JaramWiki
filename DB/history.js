var mongoose = require('mongoose')
var Schema = mongoose.Schema

var History = new Schema({
	rev: Number,
	contents: String,
	date: { type: Date, default: Date.now },
	postId: Schema.Types.ObjectId
})
module.exports = mongoose.model('History', History)
