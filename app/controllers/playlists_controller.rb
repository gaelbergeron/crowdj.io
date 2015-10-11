# A frequent practice is to place the standard CRUD actions in each controller in the following order: index, show, new, edit, create, update and destroy.

class PlaylistsController < ApplicationController

  # def index
  #   @playlists = Playlist.all
  # end

  def show
    p "i am in playlist show"
    # p params
    # if params[:action]
    #   p "i am in if"
    #   @playlist = Playlist.where(name: params[:playlist_name])
    # else

      @playlist = Playlist.find(params[:id])
    # end
  end

  def new
    p "i am in playlist new"
    @playlist = Playlist.new
  end

  def edit
  end

  def create
    p "i am in playlist controller"
    p params[:playlist][:user_id]
    @playlist = Playlist.create(name: params[:playlist][:name], user_id: params[:playlist][:user_id])
    p @playlist
    p "just before if"
    if @playlist.save
      redirect_to @playlist
    else
      render 'show', locals: {playlist: @playlist}
    end

  end

  def search
  end

  def results
    @playlist = Playlist.find(params[:id])
    @tracks = client.get('/tracks',:q => "#{params[:search][:name]}")
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
