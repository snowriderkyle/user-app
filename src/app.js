var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require( "body-parser")


app.set('views', 'src/views');
app.set('view engine', 'jade');
app.use(express.static('Public'));
//Here i get the json file and display it on index.js
app.get('/', function( req, res ){
	fs.readFile('./resources/users.json', function(err, data){
		if(err){
			console.log("Oops: " + err);
		}


		var parsedUsers = JSON.parse(data);
		
		res.render("index", {
			users: parsedUsers
		});
	});

});

app.use(bodyParser.urlencoded({ extended: true}))
// Here i display my search page
app.get( '/search', function ( req, res) {
 	res.render("search");
});
// Here I post the input from the search page
app.post( '/searchResult', function ( req, res) { 
	fs.readFile('./resources/users.json', function( err, data ){
		if(err){ 
			console.log("Oops: " + err);
		}
		var parsedUsers = JSON.parse(data);
		var searchInput = req.body.name
		var searchResult = []
// Here I use a for loop with if else statements to loop through the array and search for a match with input and names
		
	for ( i = 0; i < parsedUsers.length; i++){
		if ( searchInput == parsedUsers[i].firstname || searchInput == parsedUsers[i].lastname ){
			searchResult.push(parsedUsers[i].firstname, parsedUsers[i].lastname, parsedUsers[i].email)
		}
			};

		if (searchResult.length > 0){
			
			res.send ("Firstname: " + searchResult[0] + "<br>" + "Lastname: " + searchResult[1]+ "<br>" + "Email: " + searchResult[2])
		}
		else {res.send("No results were found.")
			
		}
 	

	});

});

// Here I display my userCreate page where you can sign up
app.get( '/userCreate', function ( req, res) {
 	res.render("userCreate");

});


// Here i use post to add the users input to the array and display it on the index page
app.post( '/', function( req, res ){ 
	fs.readFile( './resources/users.json', function( err, data ){ 
		if (err){
			console.log( 'couldn\'t save your info..' + err)
		}
		var parsedUsers = JSON.parse(data);
		var newUser = {"firstname": req.body.firstname, "lastname": req.body.lastname, "email": req.body.email}
		parsedUsers.push(newUser)

		fs.writeFile ('./resources/users.json', JSON.stringify(parsedUsers), function(err){
			if (err){
				throw err
			};
			res.render ('index',{ 
				users: parsedUsers
			});

	});
	});
});

app.post( '/Api', function( req, res ){ 
	// Created a variable that contains the searchbar input
	var userInput = req.body.search
	var capUserInput = userInput.charAt(0).toUpperCase() + userInput.slice(1)
	var empty = []
	
	// Reading the json file 
	fs.readFile( './resources/users.json', function( err, data ){ 
		if ( err ){ 
			console.log('Apperently something went wrong' );
			throw err;
		}
		// Created a variable that contains the parsed data of users.json
		var parsedUsers = JSON.parse(data);
		//Creating for loop to loop through the array
		for(var i = 0; i < parsedUsers.length; i++){
		//Creating conditionals to find out when userinput matches name from array
			if (parsedUsers[i].firstname.indexOf(capUserInput) > -1 || parsedUsers[i].lastname.indexOf(capUserInput) > -1 || (parsedUsers[i].firstname + " " + parsedUsers[i].lastname).indexOf(capUserInput) > -1 || (parsedUsers[i].lastname + " " + parsedUsers[i].firstname).indexOf(capUserInput) > -1){
					empty.push(parsedUsers[i].firstname + " " + parsedUsers[i].lastname)
			}

			}
			if( capUserInput == ''){ 
				res.send('')}
				else{ 
					res.send(empty)}
		
		
	// Send the responce back to the user
	
	});
	
});

var server = app.listen(3000, function(){
	console.log('Example app listening on port: ' + server.address().port);
});

// Here i display it all on my localhost 