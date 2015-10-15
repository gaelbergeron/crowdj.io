require 'pusher'

Pusher.url = ENV['PUSHER_URL']

Pusher.app_id = ENV['PUSHER_ID']
Pusher.key = ENV['PUSHER_KEY']
Pusher.secret = ENV['PUSHER_SECRET']