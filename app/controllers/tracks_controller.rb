class TracksController < ActionController::Base

  def create
    p params[:track]["title"]
    p "I am in tracs "
    


		TrackpicksHelper.add_update_track(params)


		redirect_ to 'playlist/'
  end

end