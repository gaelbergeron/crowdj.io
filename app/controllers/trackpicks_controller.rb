class TrackpicksController < ApplicationController

include TrackpicksHelper

	def index

	end


	def new
		p params[:playlist_name]
		@playlist = Playlist.where(name: params[:playlist_name])

		render '/playlists/show', object: @playlist 
	end

	def create
		TrackpicksHelper.add_update_track(params)

		redirect_to :controller => 'trackpicks', :action => 'new', :playlist_name => "#{params[:playlist_name]}"
  end

end
