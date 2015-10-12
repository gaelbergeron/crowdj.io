// $(document).on("crowdj:playlists_show", function(){
$(document).ready(function(){


  $('#current_playlist').on('click','a.up',upVote);
  $('#current_playlist').on('click','a.down',downVote);

});


var upVote = function(e){
  e.preventDefault();
  // debugger
  var trackpickId = $(this).closest('div').attr('id')
  console.log($(this).closest('div'));
  $.ajax({
    method:'POST',
    url:'/votes',
    data: {trackpick: trackpickId, value: 1}
  })

  .done(function(response){
    $('#vote-count' + trackpickId).html(response.votes);
  })

};

var downVote = function(e){
  e.preventDefault();
  var trackpickId = $(this).closest('div').attr('id')

  $.ajax({
    method:'POST',
    url:'/votes',
    data: {trackpick: trackpickId, value: -1}
  })

  .done(function(response){
    $('#vote-count' + trackpickId).html(response.votes);
  })

};