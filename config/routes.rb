require 'sidekiq/web'

Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: "users/sessions",
    omniauth_callbacks: "users/omniauth_callbacks"
  }
  mount Sidekiq::Web => '/sidekiq'

  namespace :api do
    resources :file_uploaders
    resources :header_column
    resources :content_and_validation
    resources :template
  end

  root 'visitor#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  match "select-column-headers", to: "visitor#index", via: [:get]
  match "map-template-columns", to: "visitor#index", via: [:get]
  match "clean-and-export", to: "visitor#index", via: [:get]
end
