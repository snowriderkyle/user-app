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
			users: parsedUsers.userArray
		});
	});

});

app.use(bodyParser.urlencoded({ extended: true}))

app.get( '/search', function ( req, res) {
 	res.render("search");
});

app.post( '/userMatch', function ( req, res) { 
	fs.readFile('./resources/users.json', function( err, data ){
		if(err){ 
			console.log("Oops: " + err);
		}
		var parsedUsers = JSON.parse(data);
		
		
	for ( i = 0; i < parsedUsers.length; i++){
		console.log('hi')

	} 
	})
	res.send(JSON.stringify(req.body))
});

var server = app.listen(3000, function(){
	console.log('Example app listening on port: ' + server.address().port);


});