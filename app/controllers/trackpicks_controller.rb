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

      @trackpick = Trackpick.new(playlist_id: params[:playlist_id], track_id: @track.id)

      @trackpick.update(user_id: current_user.id) if current_user

        if @trackpick.save
          @trackpicks = @playlist.trackpicks.where(:status => 'unPlayed').sort_by {|track| [-track.votecount,track.created_at]}

          Pusher.trigger("playlist#{@playlist.id}", 'add_trackpick', render_to_string('/playlists/_show_trackpicks', :layout => false))
          redirect_to playlist_path(@playlist)
        else
          redirect_to search_playlist_url(@playlist)
        end

    else
      redirect_to search_playlist_url(@playlist)
    end
  end

  def update
    @trackpick = Trackpick.find(params[:id])
    @trackpick.update(status: "Played")

    @playlist = Playlist.where(:id => params[:playlist_id]).first

    @trackpicks = @playlist.trackpicks.where(:status => 'unPlayed').sort_by {|track| [-track.votecount,track.created_at]}

    Pusher.trigger("playlist#{@playlist.id}", 'remove', render_to_string('/playlists/_show_trackpicks', :layout => false))

    render json: {status: "Trackpick status updated"}
  end

  def play
    @trackpick = Trackpick.find(params[:id])
    @trackpick.update(status: "playing")

    @playlist = Playlist.where(:id => params[:playlist_id]).first

    @trackpicks = @playlist.trackpicks.where(:status => 'unPlayed').sort_by {|track| [-track.votecount,track.created_at]}
    Pusher.trigger("playlist#{@playlist.id}", 'remove', render_to_string('/playlists/_show_trackpicks', :layout => false))
    Pusher.trigger("playlist#{@playlist.id}", 'activate', render_to_string('/playlists/_active_song', :layout => false, :locals => {trackpick: @trackpick}))

    render json: {status: "Trackpick status updated"}
  end

end
