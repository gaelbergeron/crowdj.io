class AddUserIdColumnToDragonflyImages < ActiveRecord::Migration
  def change
    add_column :dragonfly_images, :user_id, :integer
  end
end
