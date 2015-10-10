class CreateTrackpicks < ActiveRecord::Migration
  def change
    create_table :trackpicks do |t|
      t.references :playlist
      t.references :track
      t.references :contributor

      t.timestamps null: false
    end
  end
end
