var express = require('express')
var router = express.Router()


var threads = new Array();

threads.push({ id: 1, title: "one"})
threads.push({ id: 2, title: "o2ne"})
threads.push({ id: 3, title: "on3e"})
threads.push({ id: 4, title: "o4ne"})
threads.push({ id: 5, title: "on5e"})

var comments = new Array();

comments.push({ id : 1, date : "20161124", content : "hello" })
comments.push({ id : 2, date : "20161125", content : "world" })
comments.push({ id : 3, date : "20161126", content : "!!!" })

router.get('/',function(req, res, next) {
	res.render('discuss',{threads:threads,post_title :"asdfadf"})
})

// router.get('/:threadName', function(req, res, next) {
//   var threadName = req.params.threadName
//   var commentList = comments
//   console.log(commentList)
//   res.render('thread', { title: threadName, comments: commentList });
// });


module.exports = router;

// posts/:post/threads/:thread

// posts/:post/threads 까지만 해서 한 파일로 합치기.
