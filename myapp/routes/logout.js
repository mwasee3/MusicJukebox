

var express = require('express');
var router = express.Router();


/* GET home page. */
router.post('/', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;