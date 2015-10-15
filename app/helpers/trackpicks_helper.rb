module TrackpicksHelper

	def self.find_init_track(params)
		@track = Track.find_or_initialize_by(track_url: params[:trackpick][:track_url])
	end

	def self.update_track(params)
		@track.update(artwork_url: params[:trackpick][:artwork_url], title: params[:trackpick][:title], soundcloud_url: params[:trackpick][:soundcloud_url])
	end

end
