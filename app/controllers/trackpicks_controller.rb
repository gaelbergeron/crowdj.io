class TrackpicksController < ApplicationController

include TrackpicksHelper

	def index

	end


	def new

	end

	def create
		p params
		p params[:playlist_id]

		############ PSEUDOCODE ######################
		# check whether Track is in database
		# if not create new track
		# @track = Track.new(title: )
		# if save else

	  # create Trackpicks
	  # @playlist.trackpicks.new(track_id: @track.id)
	  # if save else

	  ################################################

		# TrackpicksHelper.add_update_track(params)


		# redirect_to 'playlist/show'


  end

end
