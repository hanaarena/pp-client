var express = require('express');
var http = require('http');
var jade = require('jade');
var router = express.Router();
var request = require('request');

var TOKEN = ''
	, NAME = ''
	, LIST = ''
	;

router.get('/index', function(req, res, next){
	if (req.cookies.PP_CLIENT) {
		TOKEN.access_token = req.cookies.PP_CLIENT;
		res.redirect('/list');
	} else if (res) {
		res.render('index');
	} else {
		next();
	}
});

router.get('/list', function(req, res, next) {
	if (req.cookies.PP_CLIENT == null && TOKEN.access_token == '') {
		res.redirect('/index');
	} else {
		var options = {
			url: 'https://coding.net/api/account/current_user?access_token=' + TOKEN.access_token || req.cookies.PP_CLIENT,
			headers: {
				'User-Agent': 'request'
			}
		};

		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				NAME = JSON.parse(body);
				console.log(NAME);
			}

			var options = {
				url: 'https://coding.net/api/social/tweet/public_tweets',
				headers: {
					'User-Agent': 'request'
				}
			};

			function callback(error, response, body) {
				if (!error && response.statusCode == 200) {
					LIST = JSON.parse(body);
					console.log(LIST);
				}

				res.render('list', {token: TOKEN.access_token || req.cookies.PP_CLIENT, username: NAME, pplist: LIST.data});
			}

			request(options, callback);
		}

		request(options, callback);
	}
});

router.get('/callback/:clientId/:clientKey/:code', function (req, res, next) {
	var options = {
		url: 'https://coding.net/api/oauth/access_token?client_id=' + req.params.clientId + '&client_secret=' + req.params.clientKey + '&grant_type=authorization_code&code=' + req.params.code,
		headers: {
			'User-Agent': 'request'
		}
	};

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			TOKEN = JSON.parse(body);
		}

		res.redirect('/list');
	}

	request(options, callback);

});

router.get('/post/pp/comment/:id/', function(req, res, next) {
	var options = {
		url: 'https://coding.net/api/social/tweet/' + req.params.id + '/comment?content=' + req.query.content + '&access_token=' + req.cookies.PP_CLIENT,
		headers: {
			'User-Agent': 'request'
		}
	};

	console.log(options.url);

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(JSON.parse(body));
		}

		res.redirect('/list');
	}

	request(options, callback);

});

module.exports = router;
