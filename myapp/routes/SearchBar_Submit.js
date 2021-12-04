var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET home page. */
router.post('/', function(req, res, next) {
    
    var first_name = req.body.search;
    var last_name = req.body.search;
    res.render('SearchBar', { artist_name : first_name, lyrics: last_name});

});

module.exports = router;