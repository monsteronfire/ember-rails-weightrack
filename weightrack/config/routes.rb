Rails.application.routes.draw do
  root to: 'ember#bootstrap'
  # root 'ember#bootstrap'
  get '/*path' => 'ember#bootstrap'
  # get '/:all', to: 'ember#bootstrap'
end