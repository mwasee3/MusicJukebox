
var express = require('express');
var router = express.Router();
var fs = require('fs');
const bcrypt = require('bcrypt');
var passwordValidator = require('password-validator');
const passport = require('passport');
let databaseOperations = require('../config/database.js');
console.log(databaseOperations);

/* GET home page. */
router.post('/', function(req, res, next) {
    
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;
    
        // bcrypt.hash(password, salt, function(err, hash) {
        //     if(err){
        //         console.log("didnt hash");
        //     }
        //     password=hash

        // });
    //Enforcing strong password
    var schema = new passwordValidator();

    schema.is().min(8)
    schema.has().not().spaces()
    schema.is().max(100)
    schema.has().digits()
    schema.has().uppercase()
    

    var isValid = schema.validate(password)
    console.log(isValid)

    if(isValid===false)
    {
        var error = "Password is not strong";
        res.render('error', {error:error});
    }

    else{
        console.log("first_name: " + first_name + "last_name: " + last_name + " Email: " + email + " Password: " + password);
        
        'use strict';
            var randomValue = Math.random() * 123;
            const salt =  bcrypt.genSaltSync(10);
        var npassword = bcrypt.hashSync(password, salt);
        let users = { 
            id: randomValue,
            firstname: first_name,
            lastname: last_name, 
            email: email,
            password: npassword
        };
        console.log(users.firstname);
        let data = JSON.stringify(users);
        fs.writeFileSync('users.json', data);
        databaseOperations.createProfile(users);
        res.render('confirmation', { first_name : first_name, last_name: last_name});
    }

});

module.exports = router;