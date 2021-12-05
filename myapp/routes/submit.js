
var express = require('express');
var router = express.Router();
var fs = require('fs');
const bcrypt = require('bcryptjs');
var passwordValidator = require('password-validator');

const passport = require('passport');
//let databaseOperations = require('../config/database.js');
//console.log(databaseOperations);

/* GET home page. */
router.post('/', function(req, res, next) {
    
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;

    //Enforcing strong password
    var schema = new passwordValidator();

    schema.is().min(8)
    schema.has().not().spaces()
    schema.is().max(100)
    schema.has().digits()
    schema.has().uppercase()
    

    var isValid = schema.validate(password)
    console.log(isValid)
    const hashedPassword = bcrypt.hash(password, 10);

    if(isValid===false)
    {
        var error = "Password is not strong";
        res.render('error', {error:error});
    }

    else{
        

        console.log("first_name: " + first_name + "last_name: " + last_name + " Email: " + email + " Password: " +hashedPassword);

        'use strict';
            var randomValue = Math.random() * 123;
        let users = [{ 
            id: randomValue,
            first_name: first_name,
            last_name: last_name, 
            email: email,
            password: hashedPassword
        }];
        
        let data = JSON.stringify(users);
        fs.writeFileSync('users.json', data);
        //databaseOperations.createProfile(users);
        res.render('confirmation', { first_name : first_name, last_name: last_name});
    }

});

module.exports = router;