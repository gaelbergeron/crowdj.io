# A frequent practice is to place the standard CRUD actions in each controller in the following order: index, show, new, edit, create, update and destroy.

class PlaylistsController < ApplicationController

  # def index
  #   @playlists = Playlist.all
  # end

  def show
    @playlist = Playlist.find(params[:id])

    @trackpicks = @playlist.trackpicks.where(:status => 'unPlayed').sort_by {|track| [-track.votecount,track.created_at]}
    @active_trackpick = @playlist.trackpicks.where(:status => 'playing').first
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
    @playlist = Playlist.find(params[:id])
    @soundcloud_tracks = client.get('/tracks',:q => "#{params[:search][:name]}")

    @tracks = []
    @soundcloud_tracks.each do |track|
      if track.streamable && track.artwork_url
        @tracks << track
      end
    end
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
