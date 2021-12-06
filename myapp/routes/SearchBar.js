var express = require('express');
var router = express.Router();
let datab = require('../config/database.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('SearchBar');
});
 
module.exports = router;