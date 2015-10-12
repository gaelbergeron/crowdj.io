class VotesController < ApplicationController

  def create

    @trackpick = Trackpick.where(:id => params[:trackpick]).first


     if request.xhr?

      @vote = Vote.create(:trackpick_id => params[:trackpick],:user_id => current_user.id, value: params[:value])

      render json: {:votes => @trackpick.votecount}

      end

  end


end
