class TrackpicksController < ApplicationController

include TrackpicksHelper

	def index
		@playlist = Playlist.where(id: params[:playlist_id])
		p @playlist
		@trackpick = Trackpick.new
		p "@" * 88
		p params["playlist_id"]
	end


	def new

	end

	def create

  end

	def search

		p "I am in search action"
		@playlist_id = params[:search]["playlist_id"]
		@playlist = Playlist.find(@playlist_id)
    @tracks = client.get('/tracks',:q => "#{params[:name]}")


    render "/trackpicks/new"



	end




end
