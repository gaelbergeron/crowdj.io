json.array!(@dragonfly_images) do |dragonfly_image|
  json.extract! dragonfly_image, :id
  json.url dragonfly_image_url(dragonfly_image, format: :json)
end
