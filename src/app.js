var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require( "body-parser")


app.set('views', 'src/views');
app.set('view engine', 'jade');

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

app.get( '/search', function ( req, res) {
 	res.render("search");
});

app.post( '/searchResult', function ( req, res) { 
	fs.readFile('./resources/users.json', function( err, data ){
		if(err){ 
			console.log("Oops: " + err);
		}
		var parsedUsers = JSON.parse(data);
		var searchInput = req.body.name
		var searchResult = []

		
		
	for ( i = 0; i < parsedUsers.length; i++){
		if ( searchInput == parsedUsers[i].firstname || searchInput == parsedUsers[i].lastname ){
			searchResult.push(parsedUsers[i].firstname, parsedUsers[i].lastname, parsedUsers[i].email)
		}
			} 

		if (searchResult.length > 0){
			
			res.send ("Firstname: " + searchResult[0] + "<br>" + "Lastname: " + searchResult[1]+ "<br>" + "Email: " + searchResult[2])
		}
		else {res.send("No results were found.")
			
		}
	});
	
});

app.get( '/userCreate', function ( req, res) {
 	res.render("userCreate");

});

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
			})

	})
	})
})

var server = app.listen(3000, function(){
	console.log('Example app listening on port: ' + server.address().port);



});
