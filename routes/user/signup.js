var express = require('express');
var routes = require('./routes/index');
var user = require('../../DB/user');

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign Up' });
});

exports.sign_up = function(req, res) {
	res.status(200);
	res.render('signup', {title: 'Sign In'})
}

exports.checklogin_id = function(req, res) {
	var uri = url.parse(req.url,true);
	user.findOne({ login_id: uri.query.id }, function (err, member) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		if(member != null) {
			res.end('true');
		}
		else {
			res.end('false');
		}
	});
}

exports.sign_up_post = function(req, res) {
	res.status(200);

	var curLogin_id = req.login_id;
	if(curLogin_id == "") {
		res.redirect('/');
	}
	else {
		user.findOne({ login_id: curLogin_id }, function (err, member) {
	  		if (err) return handleError(err);
	  		
	  		if(member == null) { // new login_id
	  			// add myMember into the model
				var myMember = new user({ login_id: curLogin_id, login_pw: req.login_pw });
				myMember.save(function (err, data) {
					if (err) {// TODO handle the error
						console.log("error");
				    }
				    console.log('member is inserted');
				});
				res.redirect('/login');
	  		}
	  		else { // in case that login_id already exists
	  			res.redirect('/');
	  		}
		});
	}
};

var myHash = function myHash(key){
  var hash = crypto.createHash('sha1');
  hash.update(key);
  return hash.digest('hex');
}