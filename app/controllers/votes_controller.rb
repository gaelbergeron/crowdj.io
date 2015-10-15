class VotesController < ApplicationController

  def create
    @vote_errors = []
    @trackpick = Trackpick.where(:id => params[:trackpick]).first
    # Isolates the users that have voted
    voters = []
    @trackpick.votes.each do |vote|
       voters << vote.user_id
    end
    # checks if the current_user.id is included in the array and lets them vote or not vote
    if !user_signed_in?
      @login_vote_error_message = "Have FOMO and can't vote? Please login"
    elsif voters.uniq.include?(current_user.id)
      @vote_error_message = "You have already voted, please vote on another song"
      @vote_errors << @vote_error_message
    else
      @vote = Vote.create(:trackpick_id => params[:trackpick],:user_id => current_user.id, value: params[:value])
    end

    @playlist = @trackpick.playlist

    @trackpicks = @playlist.trackpicks.where(:status => 'unPlayed').sort_by {|track| [-track.votecount,track.created_at]}

    if @trackpicks.length <= 10
      Pusher.trigger("playlist#{@playlist.id}", 'vote', render_to_string('/playlists/_show_trackpicks', :layout => false))
    else
      @trackpicks_rest = @trackpicks[10..-1]
      @trackpicks = @trackpicks[0..9]
      Pusher.trigger("playlist#{@playlist.id}", 'vote', render_to_string('/playlists/_show_trackpicks', :layout => false))
      @trackpicks_rest.each do |trackpick|
        Pusher.trigger("playlist#{@playlist.id}", 'add_single_trackpick', render_to_string('/playlists/_show_track', :layout => false , locals: {trackpick: trackpick}))
      end
    end

    if request.xhr?
      render :json => {:partial => render_to_string('/playlists/_show_trackpicks', layout: false), locals: {error: @vote_errors}}
    else
      redirect_to playlist_path(@playlist)
    end
  end


end
