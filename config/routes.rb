Rails.application.routes.draw do
  
  resources :remove_statuses
  resources :users, only: [:create]
  resources :interviews, only: [:create]
  resources :jobs
  resources :offers, only: [:create]
  resources :companies, only: [:index, :show, :create]
  resources :statuses, only: [:index, :show]

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/auth", to: "users#show"

  get "/users/:user_id/jobs", to: "users#jobs_index"
  get "/users/:user_id/interviews", to: "users#interviews_index"
  get "/users/:user_id/offers", to: "users#offers_index"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  
end
