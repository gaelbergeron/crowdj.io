module TrackpicksHelper

	def self.add_update_track(params)
		@track = Track.find_or_initialize_by(track_url: params[:trackpick][:track_url])
		@track.update(artist: params[:trackpick][:artist], artwork_url: params[:trackpick][:artwork_url], title: params[:trackpick][:title])

		add_update_trackpick(@track, params)

	end

	def self.add_update_trackpick(track, params)
		playlist = Playlist.find(params[:playlist_id])
		@trackpick = Trackpick.find_or_initialize_by(playlist_id: params[:playlist_id], track_id: track.id, user_id: playlist.user_id)
		@trackpick.update(playlist_id: params[:playlist_id], track_id: track.id, user_id: playlist.user_id)
	end
end
