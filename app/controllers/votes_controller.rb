class VotesController < ApplicationController

  def create

    @trackpick = Trackpick.where(:id => params[:trackpick]).first
    @playlist = @trackpick.playlist

     if request.xhr?

      @vote = Vote.create(:trackpick_id => params[:trackpick],:user_id => current_user.id, value: params[:value])

      @trackpicks = @playlist.trackpicks.sort {|a,b| b.votecount <=> a.votecount}
      render '/playlists/_show_trackpicks', layout: false

      end

  end


end
