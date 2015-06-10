var express = require('express');
var jade = require('jade');
var router = express.Router();

router.get('/index', function(req, res, next){
	if (res) {
		res.render('index');
	} else {
		next();
	}
});

module.exports = router;
