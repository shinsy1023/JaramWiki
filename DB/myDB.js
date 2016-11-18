var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var User = new Schema({
	_id = Schema.Types.ObjectId,
	login_id = String,
	login_pw = String,
	name = String
});

var Post = new Schema({
	_id = Schema.Types.ObjectId,
	title = String
});

var History = new Schema({
	_id = Schema.Types.ObjectId,
	content = String,
	date = { type: Date, default: Date.now },
	postId = Schema.Types.ObjectId
});

var Thread = new Schema({
	_id = Schema.Types.ObjectId,
	title = String,
	flag = Boolean,
	postId = Schema.Types.ObjectId
});

var Comment = new Schema({
	_id = Schema.Types.ObjectId,
	content = String,
	date = { type: Date, default: Date.now },
	writerId = Schema.Types.ObjectId,
	threadId = Schema.Types.ObjectId
});