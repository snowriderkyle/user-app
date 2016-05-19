var MIN_LENGTH = 1;
$( document ).ready(function() {
	console.log("Dom is ready")
	$("input").keyup(function() {
		console.log('typing');
		var postdata = {
			search: $('input').val()
		}
		console.log(postdata);
		$.post('/api', postdata, function(data){
			console.log(data)
		});
});
});
// 

//

// 