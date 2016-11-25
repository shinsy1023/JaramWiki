var express = require('express')
var Post = require('../../DB/post.js')
var History = require('../../DB/history.js')
var JsDiff = require('diff')
var marked = require('marked')
var router = express.Router()

router.get('/', function(req, res, next) {
	Post.find({}, function(err, posts) {
		var html = ''
		var titles = []
		posts.forEach(post => {
			post = post.toObject();
			titles.push(post.title);
		});
		res.render('post_list', {titles: titles});
	})
})

router.get('/:name', function(req, res, next) {
	console.log('title: ' + req.params.name)
	Post.findOne({title: req.params.name}, function(err, post) {
		console.log('post : ' + post);
		if(post == {} || post == null || post == '') {
			console.log('no post named \'' + req.params.name + '\' in database... redirecting to alternative page');
			res.render('view', {title: '문서를 찾을 수 없습니다.', error: true, contents : '<strong>다시 시도해 보세요.</strong>'});
		} else {
			post = post.toObject();
			History.findOne({postId: post._id, rev: post.rev}, function(err, history) {
				console.log('history: ' + history);
				console.log('title: ' + post.title + ', contents: ' + history.contents);
				marked(history.contents, function(err, content) {
					if(!err)
						res.render('view', {title: post.title, contents : content});
				})
			});
		}
	})
})

router.post('/', function(req, res, next) {
	Post.findOne({title: req.body.title}, function(err, post) {
		if(post == null || post == {} || post == '') {
			console.log(req);
			Post.create({title: req.body.title, rev: 1}, function(err, post) {
				if(err) {
					handleError(err);
				} else {
					History.create({
						rev: 1,
						contents: req.body.contents,
						date: new Date(),
						postId: post.id
					}, function(err, history) {
						if(err) 
							handleError(err);
						else {
							console.log('post has been successfully created. redirecting to wiki/' + req.params.title);
							res.redirect('wiki/' + encodeURI(req.body.title));
						}
					})
				}
			})
		} else {
			console.log('already defined');
			res.render('no_such_content', {message: '이미 존재하는 문서입니다.', contents: '제목을 바꿔서 다시 시도해 보세요.'});
		}
	})
})

router.put('/', function(req, res, next) {
	Post.findOne({title: req.body.title}, function(err, post) {
		post = post.toObject();
		History.create({contents: req.body.contents, rev: post.rev + 1, postId: post._id}, function(err, new_post) {
			History.findOne({postId: post._id, rev: post.rev}, function(err, history) {
				history.contents = JsDiff.createPatch(post.title, new_post.contents, history.contents);
				history.save(function(err, newHistory) {
					Post.update({_id: post._id}, {$set: {rev : post.rev + 1}}, function(err) {
						res.send('OK', 200);
					})
				})
			})
		});
	})
})

router.delete('/:name', function(req, res, next) {
	console.log('DELETE REQ Received');
	Post.findOne({title: req.params.name}, function(err, post) {
		post = post.toObject();
		History.find({postId: post._id}).remove(function(err) {
		}).then(function(err) {
			Post.find({title: req.params.name}).remove(function(err) {
				if(!err)
					res.send(200);
			})
		})
	} )
})


module.exports = router