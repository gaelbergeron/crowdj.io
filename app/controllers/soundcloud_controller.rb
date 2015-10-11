class SoundcloudController < ApplicationController

	def create
			p "I am in soudcloud create"
		@playlist_id = params[:soundcloud]["playlist_id"]
		@playlist = Playlist.find(@playlist_id)
    @tracks = client.get('/tracks',:q => "#{params[:name]}")


    render "/trackpicks/new"
    # new_playlist_trackpick_path(@playlist)

  end
end
