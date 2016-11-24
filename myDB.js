var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
	_id = Schema.Types.ObjectId,
	login_id = String,
	login_pw = String,
	name = String
});

var postSchema = new Schema({
	_id = Schema.Types.ObjectId,
	title = String
});

var historySchema = new Schema({
	_id = Schema.Types.ObjectId,
	content = String,
	date = { type: Date, default: Date.now },
	postId = Schema.Types.ObjectId
});

var threadSchema = new Schema({
	_id = Schema.Types.ObjectId,
	title = String,
	flag = Boolean,
	postId = Schema.Types.ObjectId
});

var commentSchema = new Schema({
	_id = Schema.Types.ObjectId,
	content = String,
	date = { type: Date, default: Date.now },
	writerId = Schema.Types.ObjectId,
	threadId = Schema.Types.ObjectId
});


module.exports = mongoose.model('user', userSchema);
module.exports = mongoose.model('post', postSchema);
module.exports = mongoose.model('history', historySchema);
module.exports = mongoose.model('thread', threadSchema);
module.exports = mongoose.model('commnet', commnetSchema);