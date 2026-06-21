# Rails Notes — Day 4

## 1. Creating Relations Between Models in a Migration

When generating a migration, you can pass `model:references` as a column type to automatically create a foreign key column and its association.

```bash
rails g migration AddUserToPosts user:references
```

This generates a migration that adds a `user_id` column to the `posts` table and sets up a foreign key.

**Important:** Generating the column alone isn't enough — you must also declare the association in **both** models so Rails knows how to use it:

```ruby
# app/models/post.rb
class Post < ApplicationRecord
  belongs_to :user
end

# app/models/user.rb
class User < ApplicationRecord
  has_many :posts
end
```

The migration creates the *database-level* relationship (the foreign key column), while `belongs_to` / `has_many` create the *Rails-level* relationship (the methods you actually use in code, like `post.user` or `user.posts`).

---

## 2. Rails Automatically Indexes Foreign Keys

When you use `references` (or `belongs_to` in a migration), Rails automatically creates a **database index** on that foreign key column.

Why this matters: indexes make lookups and joins on that column much faster. Since foreign key columns are frequently used in `WHERE` clauses and `JOIN`s (e.g., "find all posts where `user_id = 5`"), indexing them by default is a sensible performance optimization that Rails handles for you.

```ruby
# Example of what the generated migration looks like
class AddUserToPosts < ActiveRecord::Migration[7.1]
  def change
    add_reference :posts, :user, null: false, foreign_key: true
    # automatically adds an index on user_id
  end
end
```

---

## 3. Association Naming Conventions

Rails relies on **convention over configuration**. By default, it expects:

- The association name to match the other model's name (singular for `belongs_to`, plural for `has_many`).
- The foreign key column to be named `<model_name>_id`.

```ruby
class Post < ApplicationRecord
  belongs_to :user   # expects a `user_id` column, and a `User` model
end
```

If your column or model names don't follow this pattern, you must explicitly tell Rails what to use via `class_name` and `foreign_key`:

```ruby
# A post has an "author", but the model is actually called User
class Post < ApplicationRecord
  belongs_to :author, class_name: "User", foreign_key: "author_id"
end
```

This tells Rails: "the association is called `author`, but under the hood, look it up in the `User` model using the `author_id` column."

---

## 4. Using `!` for Bang Methods in Rails/Ruby

Many ActiveRecord methods have two versions: a quiet one and a "bang" (`!`) one. The non-bang version fails *silently* — it returns `false` and doesn't raise an error. The bang version raises an exception when the operation fails, which is much easier to debug, especially in the console or scripts.

```ruby
user = User.new(email: nil)
user.save        # => false (silently fails if validations don't pass)
user.save!       # => raises ActiveRecord::RecordInvalid: Validation failed: Email can't be blank
```

This applies to methods like `save`/`save!`, `update`/`update!`, `create`/`create!`, and `destroy`/`destroy!`. Use the bang versions when you want failures to be loud and obvious (e.g., while debugging in the Rails console), and the non-bang versions when you want to handle failure gracefully in your own code (e.g., checking `if user.save`).

---

## 5. `before_action` Callbacks

`before_action` runs a method before the specified controller actions execute. It's commonly used to avoid repeating code, such as fetching a record before every action that needs it.

```ruby
class PostsController < ApplicationController
  before_action :set_post, only: %i[show edit update destroy]

  def show
    # @post is already set, thanks to the before_action
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end
end
```

A few details worth knowing:

- `only:` restricts the callback to specific actions (there's also `except:` to exclude actions instead).
- `%i[...]` is Ruby's **symbol array literal**. Instead of writing `[:show, :edit, :update, :destroy]`, you write `%i[show edit update destroy]` — Ruby splits on whitespace and converts each word to a symbol automatically, saving you from typing colons and commas.

---

## 6. Responding with Multiple Formats: `respond_to`

Rails controllers can serve the *same action* in different formats (HTML, JSON, XML, etc.) depending on what the client requests. `respond_to` lets you branch the response based on the requested format:

```ruby
def show
  @post = Post.find(params[:id])

  respond_to do |format|
    format.html # renders show.html.erb
    format.json { render json: @post }
  end
end
```

This is what's often called Rails' **multi-mode** behavior: the same controller action can produce a full HTML page for a browser or raw JSON for an API client, just by changing the request's format (e.g., visiting `/posts/1.json` instead of `/posts/1`).

For JSON specifically, Rails supports different **serializers/view templates** to control exactly what data and structure gets returned. One common option is **Jbuilder**, which lets you build JSON responses using a Ruby DSL in view files like `show.json.jbuilder`:

```ruby
# app/views/posts/show.json.jbuilder
json.id @post.id
json.title @post.title
json.author @post.user.name
```

---

## 7. `authenticity_token` and CSRF Protection

The `authenticity_token` is a hidden token Rails automatically embeds in forms to protect against **Cross-Site Request Forgery (CSRF)** attacks — where a malicious site tricks a logged-in user's browser into submitting unwanted requests to your app.

Rails checks this token on every non-GET request and rejects the request if it's missing or invalid (since an attacker's site wouldn't know the correct token).

In **API-only apps**, this protection is often unnecessary (since APIs typically use tokens/headers for auth rather than cookie-based sessions), so you may need to disable it or skip it for certain actions:

```ruby
class ApplicationController < ActionController::Base
  # Skip CSRF token verification, useful in development or for API-only behavior
  skip_before_action :verify_authenticity_token
end
```

⚠️ Note: disabling this is appropriate for true APIs that don't rely on cookie sessions, but doing so on a standard browser-facing app reintroduces the CSRF vulnerability this protection exists to prevent.

---

## 8. Generating an API-Only Rails App

If you're building a backend that only serves JSON (no HTML views, no asset pipeline, no CSRF form helpers), you can scaffold the project as **API-only** from the start:

```bash
rails new app_name --api
```

This strips out the parts of Rails meant for rendering full web pages (such as view layers and certain middleware) and configures controllers to inherit from `ActionController::API` instead of `ActionController::Base`, making the app leaner and better suited for serving a frontend (like a React/Vue app) or mobile clients.

---

## 9. The `scaffold` Generator

`scaffold` is one of Rails' most powerful generators — it creates an entire CRUD resource in one command: model, migration, controller (with all 7 RESTful actions), routes, and views (or serializers, in an API-only app).

```bash
bundle exec rails g scaffold user name:string age:integer
```

This single command generates:
- A `User` model
- A migration adding `name` (string) and `age` (integer) columns
- A `UsersController` with `index`, `show`, `new`, `create`, `edit`, `update`, and `destroy` actions
- Routes (`resources :users`)
- Views or JSON responses for all actions

This is often cited as where Rails really "shines" — it demonstrates the framework's convention-over-configuration philosophy by getting a fully working resource up and running in seconds, which is great for prototyping or quickly standing up standard CRUD endpoints.

After running it, don't forget to run the migration:

```bash
bundle exec rails db:migrate
```

---

## 10. Instance-Level Method Overrides ("Singleton Methods")

Ruby allows you to override or define a method on a **single object instance**, without affecting the rest of the objects created from that class. This is sometimes referred to in Rails/Ruby circles as working with an object's **singleton class** (or "instance metadata").

```ruby
user1 = User.new(name: "Alice")
user2 = User.new(name: "Bob")

def user1.greeting
  "Hi, I'm special: #{name}"
end

user1.greeting # => "Hi, I'm special: Alice"
user2.greeting # => NoMethodError, user2 doesn't have this method
```

This works because every Ruby object has its own hidden "singleton class" sitting between it and its actual class. Defining a method directly on an instance adds it to that singleton class, so only that specific object gets the new behavior. This is a more advanced/rare technique, but it's useful for one-off behavior, testing/mocking, or metaprogramming scenarios.

