var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
	_id : Schema.Types.ObjectId,
	login_id : String,
	login_pw : String,
	name : String
});

module.exports = mongoose.model('user', userSchema);