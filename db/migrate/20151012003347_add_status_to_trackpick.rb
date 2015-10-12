class AddStatusToTrackpick < ActiveRecord::Migration
  def change
    add_column :trackpicks, :status, :string, default: "unPlayed"
  end
end