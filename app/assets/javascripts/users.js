$(document).ready(function() {

	$(".btn-pref .btn").click(function () {
	    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
	    // $(".tab").addClass("active"); // instead of this do the below 
	    $(this).removeClass("btn-default").addClass("btn-primary");   
	});

	addEditForm();
	
});


function addEditForm(){

	$('#following').on('click', function(e){
		e.preventDefault();

		console.log("I am in addEddForm preventDefault")


	})



};


