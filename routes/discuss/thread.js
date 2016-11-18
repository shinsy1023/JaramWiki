var express = require('express')
var router = express.Router()

var Threads = function threads(id,title){
	
} 

router.get('/threads',function(req, res, next) {
	res.render('discuss',threads)
})

module.exports = router;