class DragonflyImage < ActiveRecord::Base
	dragonfly_accessor :asset


	validates_property :width, of: :asset, in: (0..900)
	validates_property :mime_type, of: :asset, in: %w(image/jpeg image/png image/gif)
	# validates_property :size, of: :asset, maximum: (900.kilobytes)

end
