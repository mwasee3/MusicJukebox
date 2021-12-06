var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  fs.unlink('curr.txt', (err) => {
    if (err) {
        console.log(err.message);
    }

    console.log("File is deleted.");
});
  res.render('index', { title: 'Home' });
});

module.exports = router;
