
var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
router.use(express.urlencoded({extended:false}))
router.get('/', function(req, res, next) {
    res.render('createAccount', {title: 'createuser'});
});

module.exports = router;