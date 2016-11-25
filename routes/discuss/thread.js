var express = require('express')
var router = express.Router()
var commentDB = require('../../DB/comment')

var comment0 = new commentDB({content:"hello"})

comment0.save(function(err, book){
    if(err) return console.error(err);
    // console.dir(comment0);
});

router.get('/',function(req, res, next) {
	res.render('thread_list',threads)
});
router.get('/:threadName', function(req, res, next) {
	var threadName = req.params.threadName
	commentDB.find(function(err, comments){
        if(err) return res.status(500).send({error: 'database failure'});
        res.render('thread_detail', { title : threadName, comments : comments })
    })
});

module.exports = router
// posts/:post/threads/:thread

// posts/:post/threads 까지만 해서 한 파일로 합치기.
