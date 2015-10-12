class TrackpicksController < ApplicationController

include TrackpicksHelper

	def index
	end

	def new
	end


	def create
    @playlist = Playlist.where(id: params[:playlist_id]).first
		@track = TrackpicksHelper.find_init_track(params)
    if TrackpicksHelper.update_track(params)
      @trackpick = TrackpicksHelper.find_init_trackpick(params)
        if TrackpicksHelper.update_trackpick(params, current_user.id)
          p @trackpick
          Pusher.trigger("playlist_channel", 'add_trackpick', render_to_string('/playlists/_show_track', :locals => {trackpick: @trackpick}, :layout => false))
          redirect_to playlist_path(@playlist)
        else
          redirect_to search_playlist_url(@playlist)
        end
    else
      redirect_to search_playlist_url(@playlist)
    end


  end

end
