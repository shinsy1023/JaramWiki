var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function(app,commentDB) {
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Jaram Wiki' });
  });
}
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Jaram Wiki' });
// });

// module.exports = router;
