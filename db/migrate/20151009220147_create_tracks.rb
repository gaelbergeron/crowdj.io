class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :title
      t.string :artist
      t.string :artwork_url
      t.string :track_url
      t.timestamps null: false
    end
  end
end
