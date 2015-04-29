json.array!(@users) do |user|
  json.extract! user, :id, :name, :email, :password_digest, :product_id
  json.url user_url(user, format: :json)
end
