var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/', passport.authenticate('local'), (req, res, next)=>{
	res.render("dashboard",
	{
		first_name : req.body.first_name,
		last_name: req.body.last_name
	})
})

module.exports = router;