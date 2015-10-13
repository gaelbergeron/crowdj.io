var allTracks = [],
		playlist = [],
		i = 0,
		timer = 0;

$(document).ready(function(){

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

	$('#play-button').on('click', function(){
		playlist = [];
		$('.soundcloud-url').each(function(){
			playlist.push($(this).attr('id'));
		});
    wavesurfer.load(playlist[0]);
    $('#active-song').empty();
    $('#play-button').hide();
    regExpId = '/.*/(.*)/'
		trackId = playlist[0].match(regExpId)
		trackToUpdate = $('[id*='+trackId[1]+']')
		playingSongDiv = trackToUpdate.parent()
		playingSongDiv.children('a').hide()
		playingSongDiv.appendTo('#active-song')
    });

	var target = $('#current_playlist')[0];

	var observer = new MutationObserver(function( mutations ) {
	  mutations.forEach(function( mutation ) {
	    var newNodes = mutation.addedNodes;
	    if( newNodes !== null ) {
	    	var $nodes = $( newNodes );
	    	$nodes.each(function() {
	    		var $node = $(this).children().eq(2).attr('id')
	    		playlist.push($node)
	    	});
	    }
	  });
	});

	// Configuration of the observer:
	var config = {
		attributes: true,
		childList: true,
		characterData: true
	};

	observer.observe(target, config);

	// $('#play-button').on('click', function(){
	// 	wavesurfer.play();
	// });

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
		regExpId = '/.*/(.*)/'
		trackId = playlist[number].match(regExpId)
		trackToUpdate = $('[id*='+trackId[1]+']')
		playingSongDiv = trackToUpdate.parent()
		playingSongDiv.children('a').hide()
		playingSongDiv.appendTo('#active-song')
		playingSongId = playingSongDiv.attr('id')
		// setTimeout(function(){
		// 	$(".current_playlist").children(".trackpick#"+playingSongId).remove()
		// }, 100)
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
		}, 100);
	});

	// Event handler when a track finishes playing
	wavesurfer.on('finish', function () {
		// regExpId = '/.*/(.*)/'
		// trackId = completedTrack.match(regExpId)
		// trackToUpdate = $('[id*='+trackId[1]+']')

		var playlist_id = $('#current_playlist').children().attr('id')
		var trackpick_id = $('#active-song').children().attr('id')

		$.ajax({
			url: '/playlists/'+playlist_id+'/trackpicks/'+trackpick_id,
			type: 'put'
		})
		.done(function(response){

			// trackToUpdate.parent().remove()
		});

		$('#active-song').empty();
		playlist = [];

		$('.soundcloud-url').each(function(){
			playlist.push($(this).attr('id'));
		});

		// if (i >= playlist.length - 1) {
		if (playlist.length === 0) {
			wavesurfer.stop();
		}
		else {
			playTrack(0)

			// completedTrack = playlist[i];
			// i++;
			// playTrack(i);
			// playlist.splice(i-1, 1);
		}

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

