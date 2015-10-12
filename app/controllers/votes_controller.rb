class VotesController < ApplicationController

  def create
    @trackpick = Trackpick.where(:id => params[:trackpick]).first
    @playlist = @trackpick.playlist
    @vote = Vote.create(:trackpick_id => params[:trackpick],:user_id => current_user.id, value: params[:value])
    # @trackpicks = @playlist.trackpicks.sort {|a,b| b.votecount <=> a.votecount}
    @trackpicks = @playlist.trackpicks.where(:status => 'unPlayed').sort {|a,b| b.votecount <=> a.votecount}
    Pusher.trigger('playlist_channel', 'vote', render_to_string('/playlists/_show_trackpicks', :layout => false))

      if request.xhr?
        render :json => {:partial => render_to_string('/playlists/_show_trackpicks', layout: false)}
      else
        redirect_to playlist_path(@playlist)
      end

  end


end
