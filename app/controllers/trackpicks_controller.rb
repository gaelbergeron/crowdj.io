class TrackpicksController < ApplicationController

include TrackpicksHelper

	def new

	end

	def create

	end

	private
	
	def myCreate
		p "Hi I am here in create"
		p params


		TrackpicksHelper.add_update_track(params)


		redirect_ to 'playlist/'
	end
end
