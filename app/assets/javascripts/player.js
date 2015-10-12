var allTracks = [],
		playlist = [],
		i = 0,
		timer = 0;

$(document).ready(function(){

	$('#play-button').on('click', function(){
	var wavesurfer = Object.create(WaveSurfer);

	wavesurfer.init({
		container: document.querySelector('#wave'),
		cursorColor: '#2b7bb9',
		cursorWidth: 5,
		height: 100,
		waveColor: '#black',
		progressColor: '#39b238'
	});

	$('.soundcloud-url').each(function(){
		playlist.push($(this).attr('id'));
	});


	var observer = new MutationObserver(function( mutations ) {
	  mutations.forEach(function( mutation ) {
	    var newNodes = mutation.addedNodes; // DOM NodeList
	    if( newNodes !== null ) { // If there are new nodes added
	    	var $nodes = $( newNodes ); // jQuery set
	    	$nodes.each(function() {
	    		var $node = $( this );
	    		// if( $node.hasClass( "message" ) ) {
	    		// 	// do something
	    		// }
	    		debugger
	    	});
	    }
	  });    
	});

	wavesurfer.load(playlist[0]);

	$('#play-button').on('click', function(){
		wavesurfer.play();
	});

	$('#pause-button').on('click', function () {
		wavesurfer.playPause();
	});

	$('#stop-button').on('click', function(){
		wavesurfer.stop();
	});

	$('#next-button').on('click', function () {
		i++;
		if (i > playlist.length - 1) {
			i = 0;
		}
		if(playlist[i]) {
			playTrack(i);
		}
	});

	$('#previous-button').on('click', function () {
		if(i==0){
			i=playlist.length-1;
		}
		else{
			i--;
		}
		if(i==undefined || i<0){
			i = 0;
		}
		playTrack(i);
	});

	function playTrack(number){
			wavesurfer.load(playlist[number]);
	}

	// An event handler for when a track is loaded and ready to play.
	wavesurfer.on('ready', function () {
		// Play the track.
		wavesurfer.play();
		var duration = wavesurfer.getDuration();
		// Show duration of track.
		$('#current').text('0:00');
		$('#total').text(formatTime(duration));
		// Show the progress of the track in time.
		clearInterval(timer);
		timer = setInterval(function() {
			$('#current').text(formatTime(wavesurfer.getCurrentTime()));
		}, 1000);
		// In the playlist array mark the track as currently playing
		allTracks.forEach(function (tr) {
			tr.playing = false;
		});
		playlist[i].playing = true;

	});

	// Event handler when a track finishes playing
	wavesurfer.on('finish', function () {
		if (i >= playlist.length - 1) {
			wavesurfer.stop();
		}
		else {
			completedTrack = playlist[i];
			i++;
			playTrack(i);
		}
		regExpId = '/.*/(.*)/'
		trackId = completedTrack.match(regExpId)
		trackToUpdate = $('[id*='+trackId[1]+'] .title')
		titleTrackToUpdate = trackToUpdate.text()

		var playlist_id = $('#current_playlist').children().attr('id')
		var trackpick_id = trackToUpdate.parent().parent().attr('id')

		$.ajax({
			url: '/playlists/'+playlist_id+'/trackpicks/'+trackpick_id,
			type: 'put'
		})
		.done(function(response){
			trackToUpdate.parent().parent().remove()
		});

	});

	wavesurfer.on('seek', function () {
		$('#current').text(formatTime(wavesurfer.getCurrentTime()));
	});

	function formatTime(time){
		time = Math.round(time);
		var minutes = Math.floor(time / 60),
			seconds = time - minutes * 60;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		return minutes + ":" + seconds;
	}

	$(window).on('resize', function(){
		if($('#wave').is(":visible")) {
			wavesurfer.drawer.containerWidth = wavesurfer.drawer.container.clientWidth;
			wavesurfer.drawBuffer();
		}
	});
	});
});
	});


