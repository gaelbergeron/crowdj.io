$(document).on("crowdj:playlists_show", function(){
  var playlistId = $('.current_playlist').attr('id')
  var pusher = new Pusher('5f012bb92b08e2d2910f')
  var channel =  pusher.subscribe('playlist'+playlistId)

  channel.bind('add_trackpick', function(data) {
    $(".current_playlist#"+playlistId).parent().replaceWith(data)
    });

  channel.bind('add_single_trackpick', function(data) {
    $(".current_playlist#"+playlistId).append(data)
  });

  channel.bind('vote', function(data) {
    $(".current_playlist#"+playlistId).parent().replaceWith(data)
  });
  channel.bind('remove', function(data) {
    $(".current_playlist#"+playlistId).parent().replaceWith(data)
  });
  channel.bind('activate', function(data) {
    $("#active-song").html(data)
  })
  channel.bind('stop', function(data) {
    $("#active-song").empty()
  })
});
