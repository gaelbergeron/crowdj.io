class Vote < ActiveRecord::Base
  belongs_to :trackpick
  belongs_to :user
end
