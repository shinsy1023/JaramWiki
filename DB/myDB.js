var mongoose = require('mongoose')
var Schema = mongoose.Schema
var User = new Schema({
	_id = "<ID>",
	login_id = "<String>",
	login_pw = "<String>",
	name = "<String>",
	post_id = "<ID>"
})


var Thread = new Schema({
	_id = "<ID>",
	title = "<String>",
	flag = "<boolean>",
	postTitle = "<String>"
})

var Comment = new Schema({
	_id = "<ID>",
	threadId = "<ID>",
	content = "<String>",
	date = "<date>"
})


module.exports = mongoose.model('User', User)
module.exports = mongoose.model('Thread', Thread)
module.exports = mongoose.model('Comment', Comment)
