var MIN_LENGTH = 1;
$( document ).ready(function() {
	console.log("Dom is ready")
	
var fireRequest = true;

	$("input").keyup(function() {
		console.log('typing');
		var postdata = {
			search: $(this).val(), ajax : true
		}
		console.log(postdata);
if( postdata.search ){ 
	if( fireRequest){
		fireRequest = false
	

		$.post('/Api', postdata, function(data){
			$ ('#displaylist').empty()
			console.log(data)
			for (person in data){
				
				$ ( '#displaylist' ).append ('<option>' + data[person])
			} 
		});
		setTimeout(function() {
    			fireRequest = true
			}, 300);
	}
}

});
});
// 

//

// 