class PlaylistsController < ApplicationController

  def new
  	
  end

  def create
    @playlist = Playlist.new(params[:article])
    p @playlist
  end
end
