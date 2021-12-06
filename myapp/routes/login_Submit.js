var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
});

router.post('/', (req, res, next) => {
	console.log("here");
	console.log(req.body.email);
	console.log(req.body.password);
	passport.authenticate('local', {
		successRedirect: '/SearchBar',
		failureRedirect: '/'
	})(req, res, next);
	
});

module.exports = router;