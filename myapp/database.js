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
	var createProfileSql ='INSERT INTO PROSPECTIVE_PROFILE (prof_id, prof_firstname,prof_lastname, prof_address, prof_decision_date, prof_email, prof_password, prof_phone, prof_rent_range, prof_image_url, prof_class_num) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
	var params =[null, profile.firstName, profile.lastName, null, profile.move_date, profile.userEmail, profile.user_password, null, profile.user_rent_range, './images/user_profile_images/generic_profile_img.png', null];

	db.run(createProfileSql, params, function(err){
		if (err){
			return console.log(err.message);
		}
		console.log("Profile Created");
		console.log(`Rows inserted ${this.changes}`);	  
	});
}

let authenticateUser = (username, password, done) =>{

	var findUser = 'SELECT * FROM PROSPECTIVE_PROFILE WHERE prof_email = ?';

	db.get(findUser, username, function (err, user) {
		console.log(user);
		if (!user) {
		  return done(null, false);
		}
		bcrypt.compare(password, user.prof_password, function (err, result) {
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
db.run(`CREATE TABLE PROSPECTIVE_PROFILE (
	prof_id INTEGER PRIMARY KEY,
	prof_firstname varchar(255),
	prof_lastname varchar(255),
	prof_address varchar(255),
	prof_decision_date date,
	prof_email varchar(100),
	prof_password text,
	prof_phone varchar(45),
	prof_rent_range varchar(45),
	prof_image_url text,
	prof_class_num int(11)
  )`,
(err) => {
	if (err) {
		// Table already created
	}else{
	   //Indicate if table is already created
	   console.log('Prospective Profile Created');
	}
});