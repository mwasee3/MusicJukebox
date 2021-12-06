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
	var createProfileSql ='INSERT INTO users VALUES (?,?,?,?,?)';
	var params =[profile.id, profile.firstname, profile.lastname, profile.email, profile.password];
	db.run(createProfileSql, params, function(err){
		if (err){
			return console.log(err.message);
		}
		console.log("Profile Created");
		console.log(`Rows inserted ${this.changes}`);	  
	});
}

let authenticateUser = (username, password, done) =>{

	var findUser = 'SELECT * FROM users WHERE email = ?';
	

	db.get(findUser, username, function (err, user) {
		
		if (!user) {
		  return done(null, false);
		}
		var result=bcrypt.compareSync(password, user.password);
		if(result){
			return done(null, user);
		}
		else{
			return done(null, false);
		}
		// bcrypt.compareSync(password, user.password, function (err, result) {
		//   if (err) {
		// 	return console.log(err.message);
		//   }
		//   if (!result) {
		// 	return done(null, false);
		//   }
		//   if (result) {
		// 	return done(null, user);
		//   }
		// });
  
	  });
}

let searchInstance = (userName) =>{
	var selectF='select * from count where email=?';
	db.get(selectF,userName, function(err,data){
		if (err){
			return null;
		}
		return data;
	});
}
	
let createInstance = (userName) =>{
	var c=0;
	var del='DELETE FROM count WHERE email= ?';
	var sc=searchInstance(userName);
	if(sc==null){
		return console.log("new user");

	}
	else{
		c=sc.searchCount;
		db.run(del,userName, function(err){
			if (err){
				return console.log(err.message);
			}
		});
	}
	
	
	
	var createProfileSql ='INSERT INTO count VALUES (?,?)';
	var params =[userName,c];
	db.run(createProfileSql, params, function(err){
		if (err){
			return console.log(err.message);
		}
		console.log("instance Created");
		console.log(`Rows inserted ${this.changes}`);	  
	});
}


let updateInstance = (userName) =>{
	var selectF='select * from count where email=?';
	db.get(selectF,userName, function(err,m){
		if (err){
			return console.log(err.message);
		}
		var createProfileSql ='UPDATE count SET searchCount = ? WHERE email = ?';
		console.log(m);
		console.log(m.email);
		console.log(m.searchCount);
		var params =[m.searchCount+1,userName];
		db.run(createProfileSql, params, function(err){
			if (err){
				return console.log(err.message);
			}
			console.log("instance Created");
			console.log(`Rows inserted ${this.changes}`);	  
		});
	});
	
}
	db.run('CREATE TABLE if not EXISTS count (email varchar(100), searchCount INTEGER )',function(err){
		if (err){
			return console.log(err.message);
		}
		console.log("Table Created");
	});
db.run('CREATE TABLE if not EXISTS users ( id INTEGER, firstname varchar(255), lastname varchar(255), email varchar(100), password varchar(255) )',
(err) => {
	if (err) {
		console.log(err);
		// Table already created
	}else{
	   //Indicate if table is already created
	   console.log('Prospective Profile Created');
	}
});

module.exports ={authenticateUser,createProfile,createInstance,updateInstance};