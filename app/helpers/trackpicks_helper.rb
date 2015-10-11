module TrackpicksHelper

	def self.add_update_track(params)
		p "i am in add track"
		p params[:track]["track_url"]
    p params[:track]["title"]
    p params[:track]["artwork_url"]
    p params[:track]["artist"]

		@track = Track.find_or_initialize_by(track_url: params[:track]["track_url"])
		@track.update(artist: params[:track]["artist"], artwork_url: params[:track]["artwork_url"], title: params[:track]["title"])
		p "I am after add track to DB"
		p @track
		add_update_trackpick(@track, params)

	end

	def self.add_update_trackpick(track, params)
		p "I am in update trackpick"
		
		p params
		p track
		@trackpick = Trackpick.find_or_create(playlist_id: params[:playlist_id], track_id: track.id, user_id: current_user.id )
		@trackpick.update(artist: params[:artist], artwork_url: params[:artwork_url])

	end
end
