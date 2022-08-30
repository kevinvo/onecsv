Rails.application.routes.draw do
  namespace :api do
    resources :file_uploaders
    resources :csv_content
    resources :csv_header
    resources :clean_up_and_finalize
  end

  root 'visitor#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  match "select-column-headers", to: "visitor#index", via: [:get]
  match "map-template-columns", to: "visitor#index", via: [:get]
  match "clean-and-finalize", to: "visitor#index", via: [:get]
end
