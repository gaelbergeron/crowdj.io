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

		$.get('edit')

		 .done(function(returnData){

		 	var myRe = /<article>(.|\n)*?<\/article>/;
		 	var form = returnData.match(myRe)
		 	var html = $(form).get(0)
		 		$('.edit_form').html("")
   			$('.edit_form').append(html)


    }).fail(function(jqXHR, textStatus){
      alert(jqXHR + textStatus)
    });
	});
};


