stormpath
=========

npm Stormpath api

npm install stormpath


Examples

1.- use te npm
	
	var stormpath = require('stormpath');


2.- set the keys

	var key = "xxxxxxxxxxxxx:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"


3.- Methods

	- getTenants

		tormpath.getTenants({key: key}, function(err, res){
			if(err){
				console.log("error: " + err);	
			} else {
				console.log(res);
			}
		});


	- createAccount

		Required Properties

		email
		password
		givenName
		surname

		Optional Properties

		username
		middleName
		status

		data = {

		  "sername" : "Octavio",
		  "email" : "octavio@prueba.com",
		  "givenName" : "Otc",
		  "surname" : "Octavio",
		  "password" : "ZXXXX123z"

		}

		id of the directory

		id = "4J3XVpM6RFSabZKempZ6n5"

		stormpath.createAccount({key: key, id:id, data:data}, function(err, res){
			if(err){
				console.log("error: " + err);	
			} else {
				console.log(res);
			}
		});


	- updateAccount

		Optional Properties

		username
		email
		password
		givenName
		middleName
		surname
		status

		data = {

		  "username" : "Santigo",
		  "email" : "octavio@prueba.com",
		  "givenName" : "Otc"

		}

		id of the User

		id = "4J3XVpM6RFSabZKempZ6n5"

		stormpath.updateAccount({key: key, id:id, data:data}, function(err, res){
			if(err){
				console.log("error: " + err);	
			} else {
				console.log(res);
			}
		});



	- deleteAccount

		Id of the User

		id = "4J3XVpM6RFSabZKempZ6n5"



		stormpath.deleteAccount({key: key, id:id}, function(err, res){
			if(err){
				console.log("error: " + err);	
			} else {
				console.log(res);
			}
		});



	- authenticate

		ar data = {
			key: key,
			email: "kio@kof.com",
			password: "Zeratul123",
			id: "4J3BtYtBfh6XixDyw0XwCB"  #id of the Application
		}


		stormpath.authenticate( data, function(err, res){
			if(err){
				console.log("error: "+err);	
			} else {
				console.log(res);
			}
		});















