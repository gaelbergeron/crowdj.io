$(document).on("crowdj:playlists_show", function(){
  // var pusher = new Pusher(ENV['KEY'])

  var pusher = new Pusher('d4568fcc3382d859b1b4')
  var channel =  pusher.subscribe('playlist_channel')
  channel.bind('add_trackpick', function(data) {
      $("#current_playlist").append(data)
    });
  channel.bind('vote', function(data) {
    $("#current_playlist").replaceWith(data)
  });
});
