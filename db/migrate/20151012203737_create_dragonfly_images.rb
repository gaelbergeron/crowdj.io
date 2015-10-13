class CreateDragonflyImages < ActiveRecord::Migration
  def change
    create_table :dragonfly_images do |t|
    	t.string :asset_uid
    	t.string :asset_name
      t.timestamps null: false
    end
  end
end
