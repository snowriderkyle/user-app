var express = require('express');
var fs = require('fs');
var app = express();

app.set('views', 'src/views');
app.set('view engine', 'jade');

app.get('/', function( req, res ){
	fs.readFile('../colors.json', function(){
		if(err){
			console.log(error);
		}
		var parsedData = JSON.parse(data);
		console.log(parsedData);
		res.render("index", {
			users: parsedData.userArray
		});
	});

});

var server = app.listen(3000, function(){
	console.log('Example app listening on port: ' + server.address().port);


});