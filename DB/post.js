var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Post = new Schema({
	title: String,
	rev: Number
})

module.exports = mongoose.model('Post', Post)
