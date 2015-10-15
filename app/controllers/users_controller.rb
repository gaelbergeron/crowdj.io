class UsersController < ApplicationController

	def show
	@user = User.find(current_user.id)
	@my_playlists = Playlist.where(user_id: current_user.id)

    respond_to do |format|
        format.html # show.html.erb
        format.xml { render :xml => @user }
    end

    def show_user_past_playlists
        p "i am in User create method"
        p current_user.id
        p params


    end

    def user_params
    	params.require(:user).permit(:picture_url, :username, :email)
    end

	end




end