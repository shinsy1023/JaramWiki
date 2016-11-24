var express = require('express')
var Post = require('../../DB/Post.js')
var History = require('../../DB/History.js')
var JsDiff = require('diff')
var router = express.Router()

router.get('/:name', function(req, res, next) {
	Post.findOne({title: req.params.name}, function(err, post) {
		if(post == null || post == '' || post == {})
			res.render('history', {error: '항목이 없습니다.', revisions: 'none'});
		else {
			post = post.toObject();
			table = '<tr>\n<th>리비전</th>\n<th>일자</th>\n<th>바로가기</th>\n</tr>';
			History.find({postId: post._id}, function(err, histories) {
				histories.forEach(history => {
					history = history.toObject();
					table += '<tr>\n<td>r' + history.rev + '</td>\n<td>' + history.date + '</td>\n<td><a href="/histories/' + req.params.name + '/' + history.rev + '/">바로가기</a><td>\n</tr>'
				})
			}).then(function(err) {
				res.render('history', {revisions: table});
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
		History.find({postId: post._id}, function(err, histories) {
			contents = histories[latest_rev - 1].contents;
			for (var i = latest_rev - 2; i > revision - 2; i--) {
				var h = histories[i].toObject();
				console.log(contents);
				console.log(h.contents);
				contents = JsDiff.applyPatch(contents, h.contents);
			}
		}).then(function(err) {
			res.render('view', 
				{
					title: req.params.name + "(r" + req.params.rev + ")",
					contents: contents,
					history: true
				});
		})
	})
})



module.exports = router