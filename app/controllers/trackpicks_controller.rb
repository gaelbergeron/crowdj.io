class TrackpicksController < ApplicationController

	def new

	end

  def create
    @params = params[:name]
    @tracks = client.get('/tracks',:q => "#{params[:name]}")
  end


end
