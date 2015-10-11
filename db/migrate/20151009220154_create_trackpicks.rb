class CreateTrackpicks < ActiveRecord::Migration
  def change
    create_table :trackpicks do |t|
      t.references :playlist
      t.references :track
      t.references :user

      t.timestamps null: false
    end
  end
end
