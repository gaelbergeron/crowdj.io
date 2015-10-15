$(document).ready(function () {
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
      // 
});