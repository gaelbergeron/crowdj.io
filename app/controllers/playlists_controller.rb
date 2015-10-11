# A frequent practice is to place the standard CRUD actions in each controller in the following order: index, show, new, edit, create, update and destroy.

class PlaylistsController < ApplicationController

  # def index
  #   @playlists = Playlist.all
  # end

  def show
    @playlist = Playlist.find(params[:id])
  end

  def new
    @playlist = Playlist.new
  end

  def edit
  end

  def create
    @playlist = Playlist.new(playlist_params)

    if @playlist.save
      redirect_to @playlist
    else
      render 'new'
    end

  end

  def search

  end

  def results

    p "I am in playlist search action"
    @playlist = Playlist.find(params[:id])
    @tracks = client.get('/tracks',:q => "#{params[:name]}")


    render "/trackpicks/new"

  end

  def update
  end

  def destroy
  end

  private
    def playlist_params
      params.require(:playlist).permit(:name, :user_id)
    end
end
