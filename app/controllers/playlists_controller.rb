class PlaylistsController < ApplicationController
  def new
    @playlist = Playlist.new
  end

  def create

    @playlist = Playlist.new(playlist_params)

    if @playlist.save
      redirect_to @playlist
    else
      render 'new'
    end

    redirect_to new_playlist_path
  end

  private
    def playlist_params
      params.require(:playlist).permit(:name, :user_id)
    end
end
