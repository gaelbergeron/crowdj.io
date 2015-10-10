class TrackpicksController < ApplicationController

include TrackpicksHelper

	def new

	end

	private
	
	def myCreate
		p "Hi I am here in create"
		p params


		TrackpicksHelper.add_update_track(params)


		redirect_ to 'playlist/'
	end

  def create
    @params = params[:name]
    @tracks = client.get('/tracks',:q => "#{params[:name]}")
  end

end
