class VotesController < ApplicationController

  def create
    p "*" * 50
    p params
    p "*" * 50
    @trackpick = Trackpick.where(:id => params[:trackpick]).first
    # Isolates the users that have voted
    voters = []
    @trackpick.votes.each do |vote|
       voters << vote.user_id
    end

    # checks if the current_user.id is included in the array and lets them vote or not vote
    if voters.uniq.include?(current_user.id)
      return
    else
      @vote = Vote.create(:trackpick_id => params[:trackpick],:user_id => current_user.id, value: params[:value])
    end

    @playlist = @trackpick.playlist

    @trackpicks = @playlist.trackpicks.where(:status => 'unPlayed').sort_by {|track| [-track.votecount,track.created_at]}
    Pusher.trigger("playlist#{@playlist.id}", 'vote', render_to_string('/playlists/_show_trackpicks', :layout => false))

    if request.xhr?
      render :json => {:partial => render_to_string('/playlists/_show_trackpicks', layout: false)}
    else
      redirect_to playlist_path(@playlist)
    end
  end


end
