Rails.application.routes.draw do

  namespace :api do
    resources :file_uploaders
  end

  root 'visitor#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  match "select-column-headers", to: "visitor#index", via: [:get]

end
