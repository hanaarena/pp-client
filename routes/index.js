var express = require('express');
var http = require('http');
var jade = require('jade');
var router = express.Router();

router.get('/index', function(req, res, next){
	if (res) {
		res.render('index');
	} else {
		next();
	}
});

router.get('/callback/:clientId/:clientKey/:code', function (req, res, next) {
	var options = {
		host: 'www.coding.net',
		port: 80,
		path: '/api/oauth/access_token?client_id=' + req.params.clientId + '&client_secret=' + req.params.clientKey + '&grant_type=authorization_code&code=' + req.params.code
	};

	var req = http.request(options, function(res) {
		console.log(res);
		res.on('data', function (chunk) {
			console.log('BODY: ' + chunk);
		});
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

// write data to request body
	req.write('data\n');
	req.end();
});

module.exports = router;
