$(document).on("crowdj:playlists_show", function(){
  // var pusher = new Pusher(ENV['KEY'])
  var playlistId = $('.current_playlist').attr('id')
  var pusher = new Pusher('d4568fcc3382d859b1b4')
  var channel =  pusher.subscribe('playlist'+playlistId)

  channel.bind('add_trackpick', function(data) {
      $(".current_playlist#"+playlistId).append(data)
    });
  channel.bind('vote', function(data) {
    $(".current_playlist#"+playlistId).replaceWith(data)
  });
  channel.bind('remove', function(data) {
    $(".current_playlist#"+playlistId).replaceWith(data)
  });
});
