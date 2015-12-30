## Ember on Rails - Weightrack
Adds ember-cli to an existing rails project, following [this guide](http://nandovieira.com/setting-up-emberjs-with-rails-ember-cli-edition). Generate a rails app if you need one:
```zsh
rails new projectName 
```

##### Installing Gems
First, clean up the Gemfile by removing `turbolinks` and `jqueryujs`. Include the `ember-cli-rails` gem:
```ruby
source 'https://rubygems.org'

gem 'rails', '4.2.0'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'ember-cli-rails'
```
Note: I've found that turbolinks can affect the way JavaScript (jQuery, Angular, Ember, etc.) works in a rails app.

To install dependencies, run
```zsh
bundle install
```

##### Configuring Rails App in preparation for Ember

To generate the file `config/initializers/ember.rb`, run
```zsh
rails g ember:init
```

In `config/initializers/ember.rb`, set up the Ember app:
```ruby
EmberCLI.configure do |config|
  config.app :frontend, path: Rails.root.join('frontend').to_s
end
```

##### Ember Controller
Create the file `app/controllers/ember_contoller.rb` and in that file, add:
```ruby
class EmberController < ApplicationController
  def bootstrap
  end
end
```

And create the file `app/views/ember/bootstrap.html.erb`, which will be left empty.

Create a new layout template for ember at `app/views/layouts/ember.html.erb`, and add the following to the file:
```erb
<!doctype html>
<html dir="ltr" lang="<%= I18n.locale %>">
  <head>
    <meta charset="UTF-8">
    <title>Ember</title>
    <%= stylesheet_link_tag 'frontend' %>
    <%= include_ember_script_tags :frontend %>
  </head>

  <body>
    <%= yield %>
  </body>
</html>
```

Update `config/routes.rb`:
```ruby
Rails.application.routes.draw do
  root to: 'ember#bootstrap'
  get '/:all', to: 'ember#bootstrap'
end
```

##### Creating the Ember App
In your rails root directory, run
```zsh
ember new frontend --skip-git
```

Then in your `frontend` directory, you will need to install `ember-cli-rails-addon` NPM package:
```zsh
cd frontend
npm install ember-cli-rails-addon --save-dev
cd ..
```

Mount the ember app in the `config/routes.rb`:
```ruby
Rails.application.routes.draw do
  mount_ember_app :frontend, to: "/"

  root to: 'ember#bootstrap'
  get '/:all', to: 'ember#bootstrap'
end
```
Create a new file at `frontend/app/templates/index.hbs` to see that the implementation is working. Populate the file with something to see:
```hbs
<p>Hello World, it works!</p>
```

##### Ember CSS
Create the file `app/assets/stylesheets/frontend.scss` and add the following include:
```scss
// @import './frontend/**/*';
```

Update initializer at `config/initializers/assets.rb` by adding the line:
```ruby
Rails.application.config.assets.precompile += %w[ frontend.css ]
```

##### Run the Rails Server
Run `rails server` and you should see the ember template appear at `http://localhost:3000`, without having to start an ember server in the frontend (ember) directory.

##### Adding Navigation to the Ember Frontend
In `frontend/app/router.js`, add routes for your pages
```javascript
Router.map(function() {
  this.route('about');
});
```

Add the navigation links to the view by going to `frontend/app/templates/application.hbs` and adding the following and the top of the page, before the `{{outlet}}`:
```hbs
<nav class="main-site-nav">
  <ul class="nav-link-list">
    <li><a id="main-site-logo" href="/">Logo</a></li>
    <li>{{link-to 'About' 'about'}}</li>
    <li></li>
  </ul>
</nav>
```

##### Create the template page
Create the `about` template:
```zsh
touch frontend/app/templates/about.hbs
```

Set up adapter so that ember-data can make requests, namespaced under `api` to our server
```javascript
// frontend/app/adapters/application.js

import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
  namespace: 'api'
});
```

Add the `weights` resource to `frontend/app/router.js`:
```javascript
Router.map(function() {
  this.route('about');
  this.resource('weights');
});
```

Update the navigation in `frontend/app/templates/application.hbs` to include weights page:
```hbs
<nav class="main-site-nav">
  <ul class="nav-link-list">
    <li><a id="main-site-logo" href="/">Logo</a></li>
    <li>{{link-to 'About' 'about'}}</li>
    <li>{{link-to 'Weights' 'weights'}}</li>
  </ul>
</nav>
```

Update `frontend/app/templates/weights.hbs` to have an `{{outlet}}`
```hbs
<h3>Weights</h3>

{{outlet}}
```

#####Setting up Bourbon
[Bourbon](http://bourbon.io/) is a library of Sass mixins, we are going to try use it in place of Bootstrap or Foundation.
In the `Gemfile`, add
```ruby
gem 'bourbon'
```

In your rails root directory, run
```zsh
bundle install
```

######Set up SCSS folder structure
Create the following directories and files:
```zsh
mkdir -p app/assets/stylesheets/{0-plugins, 1-base, 2-modules, 3-layouts}

touch app/assets/stylesheets/0-plugins/plugins-dir.scss
touch app/assets/stylesheets/1-base/base-dir.scss
touch app/assets/stylesheets/2-modules/modules-dir.scss
touch app/assets/stylesheets/3-layouts/layouts-dir.scss
```
Import them the newly created scss files into `frontend.scss`
```scss
// @import './frontend/**/*';

@import '0-plugins/plugins-dir.scss';
@import '1-base/base-dir.scss';
@import '2-modules/modules-dir.scss';
@import '3-layouts/layouts-dir.scss';
```

In the file `app/assets/stylesheets/0-plugins/plugins-dir.scss`, import `bourbon.scss`
```scss
@import 'bourbon';
```

