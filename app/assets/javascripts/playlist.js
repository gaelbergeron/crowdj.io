var url = ""
$(document).ready(function(){

  sentText();
  url = window.location.href;

});

function sentText(){
  console.log("i an in sentText");
  var $eventTarget = $('form');
  $('#send-text-form').on('click', function(e){
    e.preventDefault();

    var data = $(this).serialize();
    var controller_destination = "/" + $eventTarget.attr('action');
    var method = $eventTarget.attr('method');

    console.log("in submit");
    console.log(data);
    console.log(url);
    console.log(controller_destination);
    console.log(method);

    $.post(controller_destination, {phone: data, url: url} )
    .done(function(returnData){
      console.log("I am back from controller")
  
    }).fail(function(jqXHR, textStatus){
      alert(jqXHR + textStatus)
    });


  });
};

// $(document).on('page:load', ready);