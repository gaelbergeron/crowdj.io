class TrackpicksController < ApplicationController

	def new
		p "Hi I am here"
	end

  def create
    p params
    p params[:trackpick]
  end

end
