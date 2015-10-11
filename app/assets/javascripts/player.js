var allTracks = [],		// An array for all the files loaded in the track
	playlist = [], 		// An array for the current playlist
	i = 0, 				// The number of the current track
	lastPlayed = [],	// Array for last played (used when shuffling songs)
	timer = 0;			// An interval for the track's current time.


// startPlayerWhenReady();


//******* on DOM manipulation push objects or links to playlist
	// allTracks.push(song);
	// playlist.push(song);


$(document).ready(function(){
	var wavesurfer = Object.create(WaveSurfer);

	wavesurfer.init({
		container: document.querySelector('#wave'),
		cursorColor: '#blue',
		cursorWidth: 1,
		height: 80,
		waveColor: '#green',
		progressColor: '#black'
	});

	wavesurfer.load('https://api.soundcloud.com/tracks/227808271/stream?client_id=e463348f5dce90fed78b9bc77460209e');

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

	// Read file and play it.
	// Takes one parameter - the index of the track we want to play.
	function playTrack(number){

		if(playlist[number] && playlist[i]) {
			lastPlayed.push(number);
			var file = playlist[i].audioTrack,
				result = {};
		// Load function capturing URL, need to adjust to work with Crowdj
			readFile(file, function(result){
				result = file;
				wavesurfer.loadBlob(result);
			});
		}
		// If something went wrong stop playback.
		else{
			wavesurfer.stop();
		}
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
			i++;
			playTrack(i);
		}
	});

	wavesurfer.on('seek', function () {
		$('#current').text(formatTime(wavesurfer.getCurrentTime()));
	});

});

// /*----------------------
// 	Playlist navigation
// ----------------------*/

// // Opening and closing the playlist.
// $('#track-details').on('click', function () {
// 	var expandBar = $('#expand-bar');

// 	if(expandBar.hasClass('hidden')){
// 		expandBar.removeClass('hidden');
// 		$(this).attr('title', 'Hide Playlist');
// 	}
// 	else{
// 		expandBar.addClass('hidden');
// 		$(this).attr('title', 'Show Playlist');
// 	}
// });

// $('#playlist').on('click', function (e) {

// 	// Get the index of the clicked track.

// 	var target = $(e.target),
// 		index = target.closest('.track').data('index');

// 	if(index!=undefined){

// 		// Selecting Tracks
// 		if(!target.hasClass('remove-track')){


// 			// If there was a search made, create a new playlist from the search results.
// 			if(temporarySearchPlaylist.length){
// 				playlist = temporarySearchPlaylist.slice(0);
// 				temporarySearchPlaylist = [];
// 				lastPlayed = [];
// 			}

// 			// Play the newly selected track and set it as currently playing (i).
// 			i = index;

// 			playTrack(i);

// 		}
// 		// Deleting Tracks
// 		else{

// 			var position,
// 				track;

// 			// If a track is removed while searching.
// 			if(temporarySearchPlaylist.length) {
// 				track = temporarySearchPlaylist[index];
// 			}
// 			// If a track is removed from normal playback.
// 			else {
// 				track = playlist[index];
// 			}

// 			// Remove from allTracks
// 			position = allTracks.indexOf(track);

// 			if(position != -1) {
// 				allTracks.splice(position, 1);
// 			}

// 			// Remove from playlist.
// 			position = playlist.indexOf(track);

// 			if(position != -1) {
// 				playlist.splice(position, 1);
// 			}

// 			// If we have deleted the currently playing track play next / first
// 			if (track.playing) {
// 				if (i >= playlist.length) {
// 					i = 0;
// 				}

// 				playTrack(i);
// 			}

// 			// Trigger search to render the new playlist.
// 			searchInput.trigger('input');

// 			if(!playlist.length){
// 				// Playlist is empty - try to generate new playlist from the allTracks array.
// 				if(allTracks.length){
// 					playlist = allTracks.slice(0);
// 					renderTrackList(playlist);
// 					i = 0;
// 					playTrack(i);
// 				}
// 				// Playlist is empty, allTracks is empty - deactivate player.
// 				else{
// 					wavesurfer.empty();
// 					clearInterval(timer);
// 					$('#cover-art-big').css("background", "");
// 					$('#cover-art-small').attr('src', 'assets/img/default.png');
// 					$('#expand-bar').addClass('hidden');
// 					$('#track-desc').html('There are no tracks loaded in the player.');
// 					$('#current').text('-');
// 					$('#total').text('-');
// 					$('#container').addClass('disabled');

// 					startPlayerWhenReady()
// 				}
// 			}

// 		}
// 	}

// });

// // Close playlist when clicked on cover art.
// $('#container').on('click', function (e) {
// 	if(e.target==this){
// 		$('#expand-bar').addClass('hidden');
// 	}
// });



// /*----------------------
// 	Search functionality
// -----------------------*/

// var clearSearchDelay;

// searchInput.on('keydown', function (e) {

// 	if(e.keyCode == 27){
// 		$(this).val('');
// 		$(this).trigger('input');
// 	}
// 	else if(e.keyCode == 13) {

// 		e.preventDefault();

// 		if ($(this).val().trim().length) {

// 			var searchString = $(this).val().trim();
// 			searchTracks(searchString);
// 			clearTimeout(clearSearchDelay);

// 		}
// 	}

// });

// searchInput.on('input', function(e){
// 	e.preventDefault();
// 	var searchStr = $(this).val().trim();

// 	clearTimeout(clearSearchDelay);

// 	if(!searchStr.length) {
// 		searchInput.val('');

// 		searchTracks();
// 	}
// 	else {

// 		clearSearchDelay = setTimeout(function() {
// 			if (searchStr.length) {
// 				searchTracks(searchStr);
// 			}
// 		},700);
// 	}
// });

// function searchTracks(query){

// 	query = query || "";
// 	query = query.toLowerCase();

// 	temporarySearchPlaylist = allTracks.slice(0);

// 	if(query.length){
// 		temporarySearchPlaylist = temporarySearchPlaylist.filter(function (tr) {
// 			if(tr.artist.toLowerCase().indexOf(query) != -1 || tr.title.toLowerCase().indexOf(query) != -1 || tr.album.toLowerCase().indexOf(query) != -1){
// 				return tr;
// 			}
// 		});
// 	}

// 	// Render the newly created search results list.
// 	renderTrackList(temporarySearchPlaylist);

// }


// /*-------------------
//  	Helper Functions
// --------------------*/

// Automatically start playlist on file load.
function startPlayerWhenReady(){

	var interval = setInterval(function () {
		if(playlist[0]){
			playTrack(0);
			$('#container').removeClass('disabled');
			clearInterval(interval);
		}
	},200);
}


// // Creates html for a track in the playlist.
// function returnTrackHTML(song, index){

// 	var html = '<li class="track';

// 	if(song.playing){
// 		html+= ' active'
// 	}

// 	html+='" data-index="'+ index +'">' +
// 	'<div>' +
// 	'<span class="overlay"><i class="fa fa-play"></i></span>' +
// 	'<img src="' + song.picture + '"/>' +
// 	'</div>' +
// 	'<div>'	+
// 	'<p class="title">' + song.title + '</p>' +
// 	'<p class="artist">' + song.artist + '</p>' +
// 	'<span title="Remove Track From Player" class="remove-track">×</span>' +
// 	'</div>' +
// 	'</li>';

// 	return html;
// }


// // Write the contents of a playlist into the playlist tab in the html.
// function renderTrackList(list){
// 	$('.track').remove();
// 	var html = list.map(function (tr,index) {
// 		return returnTrackHTML(tr,index);
// 	}).join('');

// 	$('#list').append($(html));
// }


// Format time in minutes:seconds
function formatTime(time){
	time = Math.round(time);

	var minutes = Math.floor(time / 60),
		seconds = time - minutes * 60;

	seconds = seconds < 10 ? '0' + seconds : seconds;

	return minutes + ":" + seconds;
}


// Wavesurfer responsiveness
$(window).on('resize', function(){
	if($('#wave').is(":visible")) {
		wavesurfer.drawer.containerWidth = wavesurfer.drawer.container.clientWidth;
		wavesurfer.drawBuffer();
	}
});