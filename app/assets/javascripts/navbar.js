var url = "";
$(document).ready(function () {
  url = window.location.href;

  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    $('#page-content-wrapper').on('click','.hamburger',function (e) {
      e.preventDefault();
      hamburger_cross(); 
    });


    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
        // location.reload(true);
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
        // location.reload(true);
      }

    }
  
  $('#page-content-wrapper').on('click', '[data-toggle="offcanvas"]', function () {
    $('#wrapper').toggleClass('toggled');
  }); 

// this javascript is for profile(user/show.html.erb) the wavesurfer error is causing it not to function so added above wavesurfer js in tree as possible work around.

  addEditForm();

    $(".btn-pref .btn").click(function () {
      $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
      // $(".tab").addClass("active"); // instead of this do the below
      $(this).removeClass("btn-default").addClass("btn-primary");
  });
    // end of user/show.html portion in doc ready does include function addEditForm below.
    sentTextFromPlaylist();
    slideDownTextBox();
});

function slideDownTextBox(){

  $('.and-friend').on('click', function(e){
    e.preventDefault();
    if ( $( '#send-twillio' ).is( ":hidden" ) ) {
      $( '#send-twillio' ).show();
    } else {
      $( '#send-twillio' ).hide();
    }
  });
};

function sentTextFromPlaylist(){
  var $eventTarget = $('form');
  $('#send-text-form').on('submit', function(e){
    e.preventDefault();

    var data = $(this).serialize();
    var controller_destination = "/" + $eventTarget.attr('action');
    var method = $eventTarget.attr('method');

    $.post(controller_destination, {phone: data, url: url} )
    .done(function(returnData){

      $( '#send-twillio' ).hide();

    }).fail(function(jqXHR, textStatus){
      alert(jqXHR + textStatus)
    });
  });
};



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