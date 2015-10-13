class TwilioController < ApplicationController
	skip_before_filter :verify_authenticity_token

	def send_text
		p "i am in send_text"
		p params
		@phone = '12679183560'
		self.send_text_message(@phone)

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
  
  def send_text_message(phone_number_to_send)

    p "i have hit the method send text"
    account_sid = ENV['TWILIO_ACCOUNT_SID']

    auth_token = ENV['TWILIO_AUTH_TOKEN']
    phone_number = ENV['TWILIO_NUMBER'] 
  # set up a client to talk to the Twilio REST API 
    @client = Twilio::REST::Client.new account_sid, auth_token 
   
    @client.account.messages.create({
    :from => phone_number, 
    :to => phone_number_to_send, 
    :body => 'This is a test',  
    })
  end

end