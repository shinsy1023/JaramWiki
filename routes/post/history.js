var express = require('express')
var Post = require('../../DB/post.js')
var History = require('../../DB/history.js')
var JsDiff = require('diff')
var marked = require('marked')
var router = express.Router()

router.get('/:name', function(req, res, next) {
	Post.findOne({title: req.params.name}, function(err, post) {
		if(post == null || post == '' || post == {}) {
			res.render('history', {error: '항목이 없습니다.', revisions: 'none'});
		} else {
			post = post.toObject();
			History.find({postId: post._id}, function(err, histories) {
				var revs = []
				var dates = []
				var links = []
				histories.forEach(history => {
					console.log(1);
					history = history.toObject();
					revs.push(history.rev);
					dates.push(history.date);
					links.push('/histories/' + req.params.name + '/' + history.rev);
				})
				res.render('history', {revisions: revs, dates: dates, links: links});
				console.log('Done');
			})
		}
	})
})
router.get('/:name/:rev', function(req, res, next) {
	Post.findOne({title: req.params.name}, function(err, post) {
		post = post.toObject();
		var revision = parseInt(req.params.rev);
		var latest_rev = post.rev;
		var contents = ''
		if(latest_rev == revision)
			res.redirect('/wiki/' + encodeURI(req.params.name));
		History.find({postId: post._id}, function(err, histories) {
			contents = histories[latest_rev - 1].contents;
			for (var i = latest_rev - 2; i > revision - 2; i--) {
				var h = histories[i].toObject();
				console.log(contents);
				console.log(h.contents);
				contents = JsDiff.applyPatch(contents, h.contents);
			}
		}).then(function(err) {
			marked(contents, function(err, content) {
				if(!err) {
					res.render('post_view', {
						title: req.params.name + " (r" + req.params.rev + ")",
						contents: content,
						history: true
					});
				}
			})
		})
	})
})



module.exports = router