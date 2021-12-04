var sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcrypt');

//Creating a new database instance - Indication of connected database
let db = new sqlite3.Database('./mplsrenter.sqlite', (err) => {
	if (err) {
	  // Cannot open database
	  console.error(err.message)
	  throw err
	}else{
		//Successful database connection
		console.log('Connected to the SQLite database.') 
	}
});

let createProfile = (profile) =>{
	var createProfileSql ='INSERT INTO PROSPECTIVE_PROFILE (firstname,lastname, email, password) VALUES (?,?,?,?)'
	var params =[profile.firstName, profile.lastName, profile.email, profile.password];

	db.run(createProfileSql, params, function(err){
		if (err){
			return console.log(err.message);
		}
		console.log("Profile Created");
		console.log(`Rows inserted ${this.changes}`);	  
	});
}

let authenticateUser = (username, password, done) =>{

	var findUser = 'SELECT * users WHERE email = ?';

	db.get(findUser, username, function (err, user) {
		console.log(user);
		if (!user) {
		  return done(null, false);
		}
		bcrypt.compare(password, user.password, function (err, result) {
		  if (err) {
			return console.log(err.message);
		  }
		  if (result) {
			return done(null, user);
		  }
		});
  
	  });
}


//Create Prospective Profile Table
db.run(`CREATE TABLE if not EXISTS users (
	id INTEGER PRIMARY KEY auto_increment,
	firstname varchar(255),
	lastname varchar(255),
	email varchar(100),
	password text, 
	)`,
(err) => {
	if (err) {
		// Table already created
	}else{
	   //Indicate if table is already created
	   console.log('Prospective Profile Created');
	}
});
module.exports ={authenticateUser,createProfile};