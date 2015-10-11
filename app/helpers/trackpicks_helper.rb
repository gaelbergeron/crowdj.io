module TrackpicksHelper

	def self.find_init_track(params)
		@track = Track.find_or_initialize_by(track_url: params[:trackpick][:track_url])
	end

	def self.update_track(params)
		@track.update(artwork_url: params[:trackpick][:artwork_url], title: params[:trackpick][:title])
	end

	def self.find_init_trackpick(params)
		@trackpick = Trackpick.find_or_initialize_by(playlist_id: params[:playlist_id], track_id: @track.id)
	end

	def self.update_trackpick(params, current_user_id)
		@trackpick.update(playlist_id: params[:playlist_id], track_id: @track.id, user_id: current_user_id)
	end
end
