var express = require('express');
var router = express.Router();
var fs = require('fs');
var user = require('../model/user-structure.js');
let userData = fs.readFileSync('./users.json');
let siteUsers = JSON.parse(userData);

router.use(express.urlencoded({extended:false}))

router.post('/', async(req, res)=>{
    try{
        if(checkPasswordLength(req.body.password)==false){
            var error = "Kindly input password length of minimum 8 characters.";
            res.render('error', {error: error});
        } else {
            siteUsers.push({
                "id":Date.now().toString(),
                "first_name":req.body.first_name,
                "last_name": req.body.last_name,
                "email": req.body.email,
                "password": req.body.password
            })
            const usersString = JSON.stringify(siteUsers)
            for(var x = 0; x < usersString.length; x++){
                if(user.email!=usersString[x].email){
                    siteUsers.push(user);
                    x = usersString.length;
                } else {
                    usersString[x].email = user.email
                    x = usersString.length;
                }
            }
            fs.writeFile('./users.json', usersString, err => {
                if(err){
                    console.log('Error writing file', err)
                }else{
                    console.log('Successfully wrote to file')
                    res.render('confirmation', {first_name: user.first_name, last_name: user.last_name});
                }
            })
        }

    }catch{
        res.redirect('/createAcccount')
    }
})

function checkPassword(password){
    if(password.length < 8){
        return false
    }

    else return true
}

exports.checkPassword = checkPassword
module.exports = router