var MIN_LENGTH = 1;
$( document ).ready(function() {
	console.log("Dom is ready")
	$("input").keyup(function() {
		console.log('typing');
		var postdata = {
			search: $(this).val()
		}
		console.log(postdata);

		$.post('/Api', postdata, function(data){
			$ ('#displaylist').empty()
			console.log(data)
			for (person in data){
				
				$ ( '#displaylist' ).append ('<option>' + data[person])
			} 
		});
});
});
// 

//

// 