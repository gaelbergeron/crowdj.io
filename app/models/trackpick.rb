class Trackpick < ActiveRecord::Base

  has_many :votes
  belongs_to :track
  belongs_to :playlist

  belongs_to :user
  belongs_to :playlist
end
