var mongoose = require('mongoose')

var User = new mongoose.Schema{
	_id = "<ID>",
	login_id = "<String>",
	login_pw = "<String>",
	name = "<String>",
	post_id = "<ID>"
}

var Post = new mongoose.Schema{
	_id = "<ID>",
	title = "<String>"
}

var History = new mongoose.Schema{
	_id = "<ID>",
	content = "<String>",
	date = "<date>",
	postId = "<ID>"
}

var Thread = new mongoose.Schema{
	_id = "<ID>",
	title = "<String>",
	flag = "<boolean>",
	postTitle = "<String>"
}

var Comment = new mongoose.Schema{
	_id = "<ID>",
	threadId = "<ID>",
	content = "<String>",
	date = "<date>"
}