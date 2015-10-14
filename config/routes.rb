Rails.application.routes.draw do
  resources :dragonfly_images
  devise_for :users, path_names: {sign_in: "login", sign_out: "logout"}




  devise_scope :user do
    get "login", to: "users/sessions#new"
    get "signup", to: "users/sessions#create"
    get "logout", to: "users/sessions#destroy"
  end
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'


    resources :playlists do

      member do
          get 'search'
          post 'results'
      end

      resources :trackpicks do
        member do
          post 'play'
        end
      end
    end

    resources :votes

    resources :users, only: [:show]

    get 'users/profile' => 'users#show'
    get 'playlist/users/profile' => 'users#show'
# for image upload dragonfly
    get "text/:text" => Dragonfly.app.endpoint { |params, app| app.generate(:text, params[:text], 'font-size' => 42)
    }

    get "image" => Dragonfly.app.endpoint { |params, app| app.fetch_file("some/dir/#{params[:file]}").thumb(params[:size])
    }

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
