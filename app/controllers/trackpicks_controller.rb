class TrackpicksController < ApplicationController

include TrackpicksHelper

	def index
		@playlist = Playlist.where(id: params[:playlist_id])
		p @playlist
		p "@" * 88
		p params["playlist_id"]
	end


	def new

	end

	def create

  end

	def soundcloud
		p "I am in soudcloud create"
		p params
	@playlist_id = params[:soundcloud]["playlist_id"]
	@playlist = Playlist.find(@playlist_id)
  @tracks = client.get('/tracks',:q => "#{params[:name]}")

  
  render 'new', locals: {tracks: @tracks}

	end




end
