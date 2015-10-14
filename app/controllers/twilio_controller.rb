class TwilioController < ApplicationController
	skip_before_filter :verify_authenticity_token

	def send_text

		text_numbers_array = params[:phone].gsub(/tel=/, "").split("+")
		url = params[:url]
		message_body = "Click link to join the party #{url}"

		self.send_text_message(text_numbers_array,  message_body)

	end

	rescue_from StandardError do |exception|
  	trigger_sms_alerts(exception)
  end

  def trigger_sms_alerts(e)
    @alert_message = "
      [This is a test] ALERT! 
      It appears the server is having issues. 
      Exception: #{e}. 
      Go to: http://newrelic.com for more details."
    @image_url = "http://howtodocs.s3.amazonaws.com/new-relic-monitor.png"
  end
  
  def send_text_message(phone_number_to_send, message_body)

    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']
    phone_number = ENV['TWILIO_NUMBER'] 
    
  	# set up a client to talk to the Twilio REST API 
    @client = Twilio::REST::Client.new account_sid, auth_token

     phone_number_to_send.each do |text|
	    @client.account.messages.create({
		    :from => phone_number, 
		    :to => text, 
		    :body => message_body,  
	    })
	  end
  end

end