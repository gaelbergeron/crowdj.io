var url = ""
$(document).ready(function(){

  sentText();
  url = window.location.href;

});


function sentText(){
  var $eventTarget = $('form');
  $('#send-text-form').on('submit', function(e){
    e.preventDefault();

    var data = $(this).serialize();
    var controller_destination = "/" + $eventTarget.attr('action');
    var method = $eventTarget.attr('method');

    $.post(controller_destination, {phone: data, url: url} )
    .done(function(returnData){

    $('#login-modal').hide('close');
    location.reload(true);


    }).fail(function(jqXHR, textStatus){
      alert(jqXHR + textStatus)
    });
  });
};



