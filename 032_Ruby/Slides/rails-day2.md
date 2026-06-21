# 🚂 Rails Day 1 — Learning Guide & Knowledge Base

A living reference built from live-session notes. Organized for someone who already knows Express, NestJS, Laravel, and Django — so the goal is mapping new Rails ideas onto frameworks you already understand, not learning web dev from zero.

## 📑 Table of Contents

- [Today's Learning Path](#todays-learning-path)
- [1. Rails Philosophy: Opinionated vs Unopinionated](#1-rails-philosophy-opinionated-vs-unopinionated)
- [2. Why MVC?](#2-why-mvc)
- [3. Rails Is Built From Gems](#3-rails-is-built-from-gems)
- [4. Creating a Rails Project — `rails new`](#4-creating-a-rails-project--rails-new)
- [5. Gems & Bundler](#5-gems--bundler)
- [6. Development Environment Quirks: `eager_load`](#6-development-environment-quirks-eager_load)
- [7. Running Rails — Puma Server](#7-running-rails--puma-server)
- [8. Routing](#8-routing)
- [9. Controllers](#9-controllers)
- [10. Models & ActiveRecord](#10-models--activerecord)
- [11. Views — ERB Templates](#11-views--erb-templates)
- [12. Full Request Lifecycle](#12-full-request-lifecycle-putting-it-all-together)
- [🧠 Rails Mental Models](#-rails-mental-models)
- [✅ What I Learned Today](#-what-i-learned-today)
- [❓ What Is Still Unclear](#-what-is-still-unclear)
- [🔮 What Will Likely Appear Next](#-what-will-likely-appear-next)
- [📋 Rails Cheat Sheet](#-rails-cheat-sheet-5-minute-review)

## 📍 Today's Learning Path

```text
Rails Philosophy (Opinionated)
        ↓
Gems & the Ruby Ecosystem
        ↓
rails new (Project Creation)
        ↓
Bundler (Gemfile / Gemfile.lock / .ruby-version)
        ↓
Dev Environment Quirks (eager_load)
        ↓
Running Rails (Puma Server)
        ↓
MVC
        ↓
Routing
        ↓
Controllers
        ↓
Models (ActiveRecord)
        ↓
Views (ERB)
        ↓
Full Request Lifecycle
```

---

## 1. Rails Philosophy: Opinionated vs Unopinionated

**What is it?** An opinionated framework makes structural decisions for you (folder layout, naming, how files connect). An unopinionated one gives you building blocks and lets you architect everything yourself.

| Opinionated | Unopinionated |
|---|---|
| Rails, Laravel, Angular, Django | Express, React |

- **Why does Rails have it?** Rails' creator (DHH) optimized for *developer happiness* and speed — fewer decisions means less setup time and less bikeshedding.
- **Problem it solves:** every new project re-debating "where do controllers go? how do we name models?"
- **Where you'll use it:** every single file you create in Rails — naming and location are rarely up to you.
- **Connects to:** Convention over Configuration, MVC, folder structure, naming conventions (all covered below).

💡 **Connection:** Being opinionated is *why* MVC, naming conventions, and folder structure all exist in Rails — they're downstream consequences of this one philosophy.

⭐ **Senior Engineer Perspective**
- Conventions reduce team arguments — a new hire can read any Rails app and roughly know where things live.
- Fighting the conventions (custom folder structures, non-standard naming) usually costs more long-term than it saves short-term.

---

## 2. Why MVC?

Corrected flow (your notes had the model→view step slightly off):

```text
User
  │
  ▼
Router            (matches URL → controller#action)
  │
  ▼
Controller        (orchestrates the request)
  │
  ▼
Model              (talks to the database)
  │
  ▼
Database
  │
  ▼
Model              (returns data)
  │
  ▼
Controller         (passes data to a view)
  │
  ▼
View               (renders HTML)
  │
  ▼
Response → User
```

- **What is it?** Model = data & business rules, View = presentation, Controller = traffic cop between the two.
- **Why does Rails have it?** Separation of concerns — you don't want SQL queries inside HTML templates, or rendering logic inside your data layer.
- **Problem it solves:** tangled "spaghetti" code where data, logic, and presentation are mixed together.

| Stage | Rails | Laravel | Django | NestJS |
|---|---|---|---|---|
| Routing | `config/routes.rb` | `routes/web.php` | `urls.py` | `@Controller()` decorators |
| Controller | `app/controllers/` | `app/Http/Controllers/` | `views.py` (yes, Django calls controllers "views") | Controller classes |
| Model/ORM | ActiveRecord | Eloquent | Django ORM | TypeORM / Prisma |
| Template | ERB | Blade | Django Templates | usually a separate frontend |

⚠ **Pitfall:** Don't confuse Django's "views.py" (which is actually the *controller* layer) with Rails' "views" (which is the *template/presentation* layer) — same word, different MVC role.

---

## 3. Rails Is Built From Gems

- **What is it?** A *gem* is Ruby's term for a package/library (same idea as an npm package or a Composer package).
- **Why does Rails have it?** Rails itself is essentially a curated bundle of gems (ActiveRecord, ActionController, ActionView, Puma, etc.) wired together by convention.
- **Problem it solves:** without gems, you'd hand-roll authentication, ORM, templating, server, routing — everything — from scratch for every project.
- **Where you'll use it:** constantly — adding a feature in Rails is often "add a gem" rather than "write it yourself."

| Package manager | Ecosystem |
|---|---|
| RubyGems (via Bundler) | Ruby / Rails |
| npm | Node / Express / NestJS |
| Composer | PHP / Laravel |
| pip | Python / Django |

💡 **Connection:** Gems are *what* gets installed; Bundler (next section) is *how* they get installed and version-locked per project.

---

## 4. Creating a Rails Project — `rails new`

```bash
rails new day1Project
```

```text
rails new day1Project
        │
        ▼
Generates folder structure + Gemfile
        │
        ▼
(gems are NOT installed yet)
        │
        ▼
bundle install
        │
        ▼
Reads Gemfile + .ruby-version
        │
        ▼
Downloads/links the gems
        │
        ▼
Project is runnable
```

| Rails | Laravel | Django | NestJS |
|---|---|---|---|
| `rails new blog` | `composer create-project laravel/laravel blog` | `django-admin startproject blog` | `nest new blog` |

⚠ **Pitfall:** Running `rails new` only scaffolds files — it doesn't mean dependencies are ready. People sometimes try `rails server` immediately and get confused when it fails before running `bundle install`.

---

## 5. Gems & Bundler

- **What is it?** Bundler is Ruby's dependency manager. It reads `Gemfile` (what you *want*) and produces `Gemfile.lock` (the *exact* resolved versions everyone on the team — and production — must use).
- **Why does Rails have it?** `bundle install ≈ npm install` — but Bundler also guarantees byte-for-byte identical dependency versions across machines via the lock file, which is stricter than npm's default behavior.
- **Problem it solves:** "works on my machine" version drift between developers/environments.

**`.ruby-version`** pins the Ruby interpreter version itself (read by version managers like rbenv/asdf/mise), so the right Ruby runtime is used before gems are even resolved.

### Dependency storage models (corrected/clarified)

| Ecosystem | Storage model |
|---|---|
| Node (Express/NestJS) | **Local** — `node_modules/` lives inside each project |
| Python (Django) | **Global by default** — pip installs system-wide unless you opt into a `venv`, which then creates an isolated local copy |
| Ruby (Rails) | **Hybrid** — actual gem files are stored *globally*, organized by Ruby version (via rbenv/asdf/mise); `Gemfile.lock` then *pins* which exact versions a given project is allowed to use |

⚠ **Pitfall:** Ignoring or manually editing `Gemfile.lock` — it should normally be regenerated by Bundler, not hand-edited, and it **must** be committed to version control.

⭐ **Senior Engineer Perspective**
- `Gemfile.lock` is what makes deploys reproducible — CI, staging, and production all install the *exact* same gem versions a developer tested locally.
- Treat lock-file conflicts in PRs carefully; resolve by re-running `bundle install`, not by hand-merging version numbers.

---

## 6. Development Environment Quirks: `eager_load`

- **What is it?** A config flag (`config.eager_load`) controlling whether Rails preloads *all* application classes into memory at boot.
- **Dev (`false`):** classes are *autoloaded lazily* — only loaded the first time they're referenced. This makes server restarts fast, which matters because you restart constantly while developing.
- **Production (`true`):** everything is preloaded at boot. Slower startup, but faster per-request performance and avoids autoload race conditions under concurrent threads.

💡 **Connection:** This ties directly into Puma's threading model (next section) — concurrent threads autoloading the same not-yet-loaded class simultaneously is a classic source of bugs, which is part of why production eager-loads everything upfront.

---

## 7. Running Rails — Puma Server

```bash
bundle exec rails server
```

- **Why `bundle exec`?** Typing plain `rails server` may invoke a *globally* installed Rails gem instead of the version pinned in this project's `Gemfile.lock` → version mismatches and subtle bugs. `bundle exec` forces the command to run using **exactly** the gem versions locked for this project.

⚠ **Pitfall:** Running global `rails`/`rake` commands instead of `bundle exec rails ...` in production-like environments — a classic source of "it worked locally" bugs.

### Puma: Workers vs Threads

Config file: `config/puma.rb`

| | Workers (`WEB_CONCURRENCY`) | Threads (`RAILS_MAX_THREADS`) |
|---|---|---|
| What | Independent OS processes | Run *inside* a worker process |
| Memory | Each gets its own RAM (high usage) | Share the worker's RAM |
| Concurrency model | Bypasses Ruby's GVL (Global VM Lock) entirely | Share the GVL, but it releases during I/O waits |
| Best for | CPU-heavy scaling | I/O-heavy work (waiting on DB/external APIs) |

```text
                Master Process
                (Cluster Mode, when workers > 0)
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
    Worker 1        Worker 2        Worker 3
    (process)       (process)       (process)
    ┌────────┐      ┌────────┐      ┌────────┐
    │Thread 1│      │Thread 1│      │Thread 1│
    │Thread 2│      │Thread 2│      │Thread 2│
    └────────┘      └────────┘      └────────┘
```

⚠ **Critical:** Your DB connection pool size in `database.yml` **must be ≥** Puma's thread count, or the app will silently start dropping/queuing DB connections under load.

⭐ **Senior Engineer Perspective**
- Tune workers up for CPU-bound apps (lots of computation); tune threads up for I/O-bound apps (lots of DB/API waiting). Most typical web apps lean I/O-bound.
- Misconfigured pool-size-vs-thread-count is a very common "random timeout in production" root cause — worth checking early when debugging connection errors.

---

## 8. Routing

```ruby
# config/routes.rb
get "/posts", to: "posts#index"   # controller#action
```

`"posts#index"` means: **PostsController**, **index** action.

| Rails | Laravel | Express | NestJS | Django |
|---|---|---|---|---|
| `get "/posts", to: "posts#index"` | `Route::get('/posts', [PostController::class, 'index']);` | `app.get('/posts', handler)` | `@Get('posts')` decorator | `path('posts/', views.index)` |

💡 **Connection:** A route is just a *pointer* — the router doesn't do any work itself, it hands off to a controller action, which is the next stop.

⚠ **Pitfall:** Confusing the *route* (the URL pattern) with the *action* (the actual method that runs) — they're separate concepts wired together via `controller#action`.

---

## 9. Controllers

```ruby
# app/controllers/posts_controller.rb   (plural — convention!)
class PostsController < ApplicationController
  def index
    # an Action — public method, mapped to a route
  end

  private

  def some_helper
    # private method — NOT routable, just internal logic
  end
end
```

- **What is it?** Orchestrates one request: pulls data via the model, decides what to render.
- **Why private methods matter:** in Rails, *public* instance methods on a controller are implicitly treated as routable actions. Marking helper methods `private` prevents them from being accidentally exposed as URL endpoints — this is a deliberate convention, not just style.

| Rails | Laravel | NestJS |
|---|---|---|
| `posts_controller.rb` (plural, snake_case) | `PostController.php` (singular, PascalCase) | `posts.controller.ts` |

⚠ **Pitfall:** Naming the file/class singular (`post_controller.rb`) — Rails convention requires **plural** controller names.

⭐ **Senior Engineer Perspective**
- Keep controllers "thin" — they should orchestrate, not contain business logic. Heavy logic belongs in models or service objects, not actions.
- Accidentally-public helper methods are a real (if subtle) security/maintainability smell — always default to `private` unless a method is meant to be an action.

---

## 10. Models & ActiveRecord

```ruby
# app/models/post.rb   (singular — convention!)
class Post < ApplicationRecord
end
```

- **What is it?** ActiveRecord is a design pattern where one object/class maps to one database table, and one instance maps to one row. The class bundles together data access (querying/saving) *and* domain logic in one place.
- **Why does Rails have it?** Lets you write `Post.find(1)` or `post.save` instead of hand-writing SQL for every operation.
- **Problem it solves:** boilerplate SQL plumbing for standard CRUD.

| Rails | Laravel | Django | NestJS |
|---|---|---|---|
| ActiveRecord | Eloquent | Django ORM | TypeORM / Prisma |

⚠ **Pitfall:** Naming the model file/class plural (`posts.rb`) — Rails convention requires **singular** model names (table names, however, are plural — `posts` table ↔ `Post` model).

💡 **Connection:** ActiveRecord models are how the controller talks to the database — and later, migrations are how you define/change the table structure these models map to (next topic, not covered yet).

⭐ **Senior Engineer Perspective**
- ActiveRecord is extremely productive for standard CRUD, but it's easy to abuse — piling business logic into "fat models" creates its own maintainability problems, just shifted from controllers to models.

---

## 11. Views — ERB Templates

```
app/views/posts/index.html.erb
```

ERB ("Embedded Ruby") syntax:

| Tag | Meaning |
|---|---|
| `<% %>` | Run Ruby code, **no output** (e.g. `if`/`end`) |
| `<%= %>` | Run Ruby code **and output** the result into the HTML |

```erb
<% if true %>
  <%= @users %>
<% else %>
  <h2>In the else</h2>
<% end %>
```

| Rails | Laravel | Django | Express |
|---|---|---|---|
| ERB (`.html.erb`) | Blade (`.blade.php`) | Django Templates | EJS / Handlebars |

⚠ **Pitfall:** Putting business logic (queries, calculations, conditionals beyond simple display logic) directly in views — that belongs in the controller or model. Views should mostly just *display* data they're handed.

---

## 12. Full Request Lifecycle (Putting It All Together)

Walking through `GET /posts`:

```text
1. User requests GET /posts
2. config/routes.rb matches it → posts#index
3. PostsController#index runs
4. Controller asks Post model for data
5. Post (ActiveRecord) queries the database
6. Database returns rows
7. Post model wraps them as Ruby objects
8. Controller passes objects to the view
9. app/views/posts/index.html.erb renders HTML
10. HTML response sent back to the user
```

```text
User → Router → Controller → Model → DB → Model → Controller → View → Response → User
```

---

# 🧠 Rails Mental Models

- **Rails is an opinionated meta-framework** — it bundles gems (ActiveRecord, ActionController, ActionView, Puma...) and enforces strong conventions so teams don't have to re-decide structure on every project.
- **MVC exists to separate concerns**: Model = data/business rules, View = presentation, Controller = orchestration. This keeps SQL out of HTML and rendering logic out of the database layer.
- **A request's journey**: Router matches a URL to `controller#action` → Controller asks a Model for data → Model talks to the DB via ActiveRecord → Controller hands data to a View → View renders HTML → response goes back to the user.
- **Gems exist** because Ruby's ecosystem favors composing small, reusable libraries instead of hand-rolling everything; Rails itself is essentially "gems, wired together by convention."
- **Bundler exists** to make dependency resolution *reproducible* — `Gemfile` says what you want, `Gemfile.lock` freezes exactly what every environment must use.
- **ActiveRecord exists** so you interact with the database through Ruby objects/methods instead of raw SQL, while still following the "one class per table" pattern.
- **Naming conventions aren't optional style** — they're how Rails auto-wires files together (plural controllers, singular models, matching folder names) without you writing explicit configuration.

---

## ✅ What I Learned Today
- Opinionated vs unopinionated framework philosophy, and why Rails chose opinionated
- The full MVC request flow
- How gems + Bundler + `.ruby-version` resolve dependencies (and the hybrid global/local storage model)
- Why `eager_load` is `false` in development
- `bundle exec rails server` and the reasoning behind `bundle exec`
- Puma's workers-vs-threads model and cluster mode
- Basic routing (`controller#action`), controller actions vs private methods, model naming, and ERB syntax

## ❓ What Is Still Unclear
- ActiveRecord internals beyond "it's the Active Record pattern" — query methods, validations, callbacks
- Migrations (how table structure is actually defined/changed) were only briefly implied
- Layouts, partials, and helpers in the view layer beyond raw ERB

## 🔮 What Will Likely Appear Next
- `resources :posts` and RESTful routing conventions
- Migrations and schema changes
- Full CRUD actions (`new`, `create`, `edit`, `update`, `destroy`)
- ActiveRecord validations and querying in depth
- Layouts and view helpers
- Associations (`has_many`, `belongs_to`)

---

# 📋 Rails Cheat Sheet (5-Minute Review)

**Project setup**
```bash
rails new my_app        # scaffold a new project (no gems installed yet)
bundle install           # install gems per Gemfile + Gemfile.lock
bundle exec rails server # run server using locked gem versions
```

**Key files**
| File | Purpose |
|---|---|
| `Gemfile` | Declares wanted gems |
| `Gemfile.lock` | Exact resolved versions — commit this, don't hand-edit |
| `.ruby-version` | Pins the Ruby interpreter version |
| `config/routes.rb` | URL → controller#action mappings |
| `config/puma.rb` | Server (workers/threads) config |
| `config/database.yml` | DB connection + pool size |

**Naming conventions**
| Thing | Convention | Example |
|---|---|---|
| Controller | Plural, snake_case | `posts_controller.rb` |
| Model | Singular, snake_case | `post.rb` |
| Table | Plural | `posts` |
| View folder | Matches controller (plural) | `app/views/posts/` |

**Routing syntax**
```ruby
get "/posts", to: "posts#index"   # controller#action
```

**ERB syntax**
```erb
<% ruby_code_no_output %>
<%= ruby_code_with_output %>
```

**MVC flow (memorize this)**
```
User → Router → Controller → Model → DB → Model → Controller → View → User
```

**Puma quick rules**
- Workers = separate processes, CPU-heavy scaling
- Threads = shared-RAM, I/O-heavy scaling
- DB pool size ≥ thread count, always

**Golden rules**
- Always `bundle exec` your Rails/rake commands
- Never hand-edit `Gemfile.lock`
- Controllers: plural. Models: singular.
- Keep controllers thin, keep business logic out of views
