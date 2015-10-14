class AddSoundcloudUrlToTracks < ActiveRecord::Migration
  def change
    add_column :tracks, :soundcloud_url, :string
  end
end
