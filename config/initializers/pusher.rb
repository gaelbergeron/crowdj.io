require 'pusher'

Pusher.app_id = ENV['PUSHER_ID']
Pusher.key = ENV['PUSHER_KEY']

Pusher.secret = ENV['PUSHER_SECRET']
Pusher.url = ENV['PUSHER_URL']
Pusher.logger = Rails.logger