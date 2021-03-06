class ApplicationController < ActionController::Base
  require 'twilio-ruby' 
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  def after_sign_in_path_for(users)
    new_playlist_path
  end


  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :username
    devise_parameter_sanitizer.for(:sign_up) << :phone_number 
    devise_parameter_sanitizer.for(:account_update) << :username
    devise_parameter_sanitizer.for(:account_update) << :phone_number
    devise_parameter_sanitizer.for(:account_update) << :picture_url
  end

  def client
    client = Soundcloud.new(
      :client_id => ENV["CLIENT_ID"],
      :client_secret => ENV["CLIENT_SECRET"],
      :redirect_uri => ENV["REDIRECT_URI"]
        )
  end

 
  # put your own credentials here 



end
