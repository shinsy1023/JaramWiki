var express = require('express')
var Post = require('../../DB/post.js')
var History = require('../../DB/history.js')
var JsDiff = require('diff')
var router = express.Router()

router.get('/:title', function(req, res, next) {
	Post.findOne({title : req.params.title}, function(err, post) {
		if(post == {} || post == null || post == '') {
			res.render('no_such_content', {message : '해당 문서가 존재하지 않습니다.', contents: '요청한 문서가 존재하지 않습니다. 다시 시도해 보세요.'})
		} else {
			History.findOne({postId : post._id, rev: post.rev}, function(err, history) {
				history = history.toObject();
				console.log('got title : ' + post.title + ", contents : " + history.contents);
				res.render('./post/editor', {title : req.params.title, contents : history.contents, method: 'PUT'});
			})
		}
	})
})

router.get('', function(req, res, next) {
	console.log('redirected to write.js get');
	res.render('./post/editor', {title : '', contents : '', method: 'POST'});	
})
module.exports = router
