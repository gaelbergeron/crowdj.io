$(document).on("crowdj:playlists_show", function(){

  $('body').on('click','a.up',upVote);
  $('body').on('click','a.down',downVote);

});


var upVote = function(e){
  e.preventDefault();
  var trackpickId = $(this).parent().parent().attr('id')

  $.ajax({
    method:'POST',
    url:'/votes',
    dataType: 'json',
    data: {trackpick: trackpickId, value: 1}
  })

  .done(function(response){
    $(this).closest('div').children('.count').html(response.partial);
    $('.trackpick#'+trackpickId).children('#track-details').children('p#vote-error').append(response.locals.error[0]);
  })
};

var downVote = function(e){
  e.preventDefault();
  var trackpickId = $(this).parent().parent().attr('id')

  $.ajax({
    method:'POST',
    url:'/votes',
    dataType: 'json',
    data: {trackpick: trackpickId, value: -1}
  })

  .done(function(response){
    $(this).closest('div').children('.count').html(response.partial);
    $('.trackpick#'+trackpickId).children('#track-details').children('p#vote-error').append(response.locals.error[0]);
  })
};

$(function(){
  $(".increment").click(function(){

    $(this).parent().addClass("bump");

    setTimeout(function(){
      $(this).parent().removeClass("bump");
    }, 400);
  });
});