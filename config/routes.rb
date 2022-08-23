Rails.application.routes.draw do
  resources :file_uploaders
  root 'visitor#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  match "select-column-headers", to: "visitor#index", via: [:get]

end
