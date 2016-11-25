var express = require('express')
var router = express.Router()

var Threads = function threads(id,title){
	
}

router.get('/threads',function(req, res, next) {
	res.render('discuss',threads)
})
router.get('/threads/:threadName', function(req, res, next) {
  console.log(comment0)
  var threadName = req.params.threadName
  var comments = comments
  res.render('thread.pug', { title: threadName, post: postName, comments: comments });
});
module.exports = router;

// posts/:post/threads/:thread

// posts/:post/threads 까지만 해서 한 파일로 합치기.