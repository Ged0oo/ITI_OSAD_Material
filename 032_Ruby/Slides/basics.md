# Ruby Basics for Python/JS Developers

Ruby's syntax looks unfamiliar at first, but conceptually it sits somewhere between Python (dynamic, object-oriented, readable) and JS (everything is an expression, blocks are everywhere). The biggest mental shift: **literally everything in Ruby is an object**, including numbers, `nil`, and even classes themselves. There's no primitive/object split like in JS.

---

## 1. Variables, Types, and Syntax Basics

No `var`/`let`/`const`, no type declarations, no semicolons (optional but unidiomatic), and `end` closes blocks instead of `}` or indentation.

```ruby
name = "Ahmed"        # String
age = 25               # Integer
height = 1.78          # Float
is_dev = true          # Boolean (true/false, lowercase, not True/False like Python)
nothing = nil          # like None (Python) / null (JS)

# String interpolation uses #{} not f-strings or template literals
puts "#{name} is #{age} years old"
```

Naming conventions: `snake_case` for variables/methods, `CamelCase` for classes/modules, `SCREAMING_SNAKE_CASE` for constants. Variables starting with a capital letter are treated as constants by convention (mutation gives a warning, not an error).

### Truthiness — the big surprise coming from Python/JS

In Ruby, **only `nil` and `false` are falsy**. Everything else — including `0`, `""`, `[]`, `{}` — is truthy. This trips up a lot of Python/JS developers.

```ruby
if 0
  puts "this prints!"   # 0 is truthy in Ruby, unlike Python/JS
end
```

---

## 2. Core Data Structures

```ruby
arr = [1, 2, "three", :four]      # Arrays are heterogeneous, like Python lists
hash = { name: "Ahmed", age: 25 } # Hash — like a dict/object. Shorthand for symbol keys
hash2 = { "name" => "Ahmed" }     # Old-style "rocket" syntax, still valid for any key type

arr.push(5)        # or arr << 5
hash[:name]         # => "Ahmed"

range = (1..5)      # inclusive range 1,2,3,4,5
range2 = (1...5)     # exclusive range 1,2,3,4
```

### Symbols

A Ruby-specific type you won't have seen in Python/JS. A `:symbol` is an immutable, reusable identifier — similar in spirit to JS's interned strings, but visibly distinct from a `String`. They're commonly used as hash keys and method options because they're cheap to compare.

```ruby
:status            # a symbol
"status".to_sym     # => :status
:status.to_s        # => "status"
```

---

## 3. Pass by Value vs Pass by Reference

This works almost identically to Python, not like you might fear. Ruby passes **references to objects, by value** — there's no true "pass by reference" like C++ has. That means:

- Mutating an object's *contents* inside a method affects the caller's object (since both point to the same object).
- Reassigning the parameter to a new object inside the method does **not** affect the caller's variable.

```ruby
def mutate!(array)
  array << 4          # mutates the same array object the caller has
end

def reassign(array)
  array = [9, 9, 9]    # just rebinds the local variable, caller unaffected
end

a = [1, 2, 3]
mutate!(a)
puts a.inspect    # => [1, 2, 3, 4]

reassign(a)
puts a.inspect    # => [1, 2, 3, 4]  (unchanged)
```

Numbers, symbols, `true`/`false`/`nil` are immutable in Ruby, so they always *behave* as if passed by value, similar to Python's ints/strings.

---

## 4. Methods

```ruby
def add(a, b)
  a + b              # implicit return — last evaluated expression is returned
end

def add_explicit(a, b)
  return a + b        # explicit return also works
end

# Default arguments
def greet(name, greeting = "Hello")
  "#{greeting}, #{name}!"
end

# Splat (*args) and double splat (**kwargs), just like Python
def sum(*numbers)
  numbers.sum
end

def configure(**options)
  options.each { |k, v| puts "#{k}: #{v}" }
end

# Keyword arguments (explicit, like Python's named args)
def connect(host:, port: 80)
  "#{host}:#{port}"
end
connect(host: "localhost")  # port defaults to 80
```

Parentheses are optional when calling methods: `add 2, 3` works exactly like `add(2, 3)`. This is why Ruby code reads like English sentences (`puts "hi"`, `5.times { ... }`).

---

## 5. Bang (`!`) and Question (`?`) Methods

These are **naming conventions**, not special syntax — `!` and `?` are just legal characters at the end of a method name.

- `?` methods conventionally return a boolean (predicate methods): `empty?`, `nil?`, `even?`, `include?`.
- `!` methods conventionally indicate a "more dangerous" version of a method that mutates the receiver in place or raises on failure, as opposed to a "safe," non-mutating sibling with the same base name.

```ruby
name = "Ahmed"
name.upcase        # => "AHMED" — returns a new string, `name` unchanged
name.upcase!       # mutates `name` itself in place
name               # => "AHMED" now

[3, 1, 2].sort      # => [1, 2, 3], original array unchanged
[3, 1, 2].sort!     # sorts in place, returns the same mutated array

"hello".empty?      # => false
[].empty?           # => true
5.nil?              # => false
```

There's nothing stopping *you* from defining your own `!`/`?` methods — Ruby just expects you to follow the convention so other developers can predict behavior from the name.

---

## 6. Conditionals: `if`/`elsif`/`else`, `unless`, ternary

Note the spelling: **`elsif`**, not `elif` or `else if`.

```ruby
if score >= 90
  puts "A"
elsif score >= 80
  puts "B"
else
  puts "C"
end

# unless is "if not" — reads naturally for negative conditions
unless logged_in
  puts "Please log in"
end

# Postfix / modifier form — very idiomatic Ruby, used constantly
puts "Adult" if age >= 18
puts "Locked" unless authorized

# Ternary, same as JS/Python's a if cond else b — but C-style syntax
status = age >= 18 ? "adult" : "minor"
```

`if`/`unless`/`case` are all *expressions* in Ruby (like in some functional languages) — they return a value you can assign directly:

```ruby
message = if score >= 60
            "pass"
          else
            "fail"
          end
```

---

## 7. `case`/`when`

Like a `switch`, but more powerful — it uses the `===` ("case equality") operator under the hood, so it can match classes, ranges, regexes, and lambdas, not just exact values.

```ruby
case grade
when "A"
  puts "Excellent"
when "B", "C"
  puts "Good"
else
  puts "Needs work"
end

# Range matching
case age
when 0..12
  puts "Child"
when 13..19
  puts "Teen"
else
  puts "Adult"
end

# Class matching
case value
when Integer
  puts "It's an integer"
when String
  puts "It's a string"
end

# case can also be used as an expression
size = case shirt
       when "S", "M" then "small-ish"
       else "large-ish"
       end
```

---

## 8. Loops and Iterators

Ruby technically has `while`/`until`/`for`, but idiomatic Ruby almost always prefers **iterator methods with blocks** instead of manual loops — this is the single biggest stylistic difference from Python/JS.

```ruby
# while / until (until is "while not")
i = 0
while i < 5
  puts i
  i += 1
end

i = 0
until i >= 5
  puts i
  i += 1
end

# Avoid `for` in idiomatic Ruby — prefer .each
[1, 2, 3].each { |n| puts n }

# do...end is equivalent to {} for multi-line blocks (style convention: {} for one-liners)
[1, 2, 3].each do |n|
  puts n * 2
end

5.times { |i| puts i }            # 0..4
(1..5).map { |n| n * n }           # => [1, 4, 9, 16, 25]
[1, 2, 3, 4].select { |n| n.even? } # => [2, 4]  (like Python's filter)
[1, 2, 3, 4].reject { |n| n.even? } # => [1, 3]
[1, 2, 3].reduce(0) { |sum, n| sum + n } # => 6  (like Python's reduce/JS's .reduce)
```

### Blocks, `yield`, Procs, and Lambdas

A **block** is an anonymous chunk of code passed to a method — conceptually similar to passing a callback function in JS, but with special syntax (`{}` or `do...end`) instead of being a normal argument.

```ruby
def repeat(n)
  n.times { |i| yield i }   # yield hands control to the block passed in
end

repeat(3) { |i| puts "iteration #{i}" }

# Turn a block into a reusable object: Proc or Lambda
square = ->(x) { x * x }      # lambda (strict arg checking, `return` exits only the lambda)
square.call(4)                 # => 16, also: square.(4) or square[4]

add_proc = Proc.new { |a, b| a + b }  # proc (looser arg checking, `return` exits enclosing method)
add_proc.call(2, 3)             # => 5
```

---

## 9. Exception Handling

Equivalent to Python's `try/except/else/finally`, with different keywords.

```ruby
begin
  result = 10 / 0
rescue ZeroDivisionError => e
  puts "Error: #{e.message}"
rescue StandardError => e
  puts "Some other error: #{e.message}"
else
  puts "No errors occurred"     # runs only if no exception was raised
ensure
  puts "This always runs"        # like Python's finally
end

# Raising exceptions
raise "Something went wrong"               # raises RuntimeError
raise ArgumentError, "Invalid input"

# Custom exception classes — just inherit from StandardError
class InsufficientFundsError < StandardError
  def initialize(msg = "Not enough funds")
    super(msg)
  end
end

begin
  raise InsufficientFundsError
rescue InsufficientFundsError => e
  puts e.message
end

# Methods can also rescue without an explicit begin/end block
def risky_method
  1 / 0
rescue ZeroDivisionError
  puts "Caught it"
end
```

---

## 10. Classes

```ruby
class Person
  attr_accessor :name, :age      # auto-generates getter+setter (like @property in Python, but for both)
  # attr_reader :name            # getter only
  # attr_writer :name            # setter only

  @@count = 0                    # class variable, shared across all instances

  def initialize(name, age)      # constructor, like Python's __init__
    @name = name                 # instance variable (the @ is required, unlike Python's self.x)
    @age = age
    @@count += 1
  end

  def greet                      # regular instance method
    "Hi, I'm #{@name}"
  end

  def self.count                 # class method, like Python's @classmethod / staticmethod
    @@count
  end

  def to_s                        # special method — controls string conversion (like Python's __str__)
    "Person(#{@name}, #{@age})"
  end
end

p1 = Person.new("Ahmed", 25)
puts p1.greet
puts p1.name           # uses the auto-generated getter
p1.name = "New Name"   # uses the auto-generated setter
puts Person.count       # => 1
puts p1                 # calls to_s automatically => "Person(New Name, 25)"
```

### Inheritance

```ruby
class Animal
  def initialize(name)
    @name = name
  end

  def speak
    "..."
  end
end

class Dog < Animal               # < means "inherits from"
  def speak
    "#{@name} says Woof!"
  end
end

class Cat < Animal
  def initialize(name, indoor: true)
    super(name)                  # calls the parent's initialize
    @indoor = indoor
  end

  def speak
    base = super rescue "..."     # super with no parens/args forwards the same args automatically
    "#{@name} says Meow!"
  end
end
```

Every class implicitly inherits from `Object`, and there's no multiple inheritance — that gap is filled by **modules/mixins** (next section).

---

## 11. Modules and Mixins

A `module` is similar to a namespace (like a JS/Python module) but can **also** be mixed into classes to share behavior — this is Ruby's substitute for multiple inheritance.

```ruby
# Module as a namespace
module Shapes
  class Circle
    def initialize(r) = @r = r
  end
end

Shapes::Circle.new(5)    # :: is the namespace resolution operator

# Module as a mixin
module Flyable
  def fly
    "#{name} is flying!"
  end
end

module Swimmable
  def swim
    "#{name} is swimming!"
  end
end

class Duck
  include Flyable          # mixes instance methods into Duck
  include Swimmable
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

duck = Duck.new("Donald")
puts duck.fly      # => "Donald is flying!"
puts duck.swim      # => "Donald is swimming!"

# extend adds the module's methods as CLASS methods instead of instance methods
class Robot
  extend Flyable
end
```

The most commonly used built-in mixins are `Comparable` (gives you `<`, `>`, `between?`, etc. once you define `<=>`) and `Enumerable` (gives you `map`, `select`, `reduce`, etc. once you define `each`) — this is how custom classes get iterator-like behavior for free.

```ruby
class Money
  include Comparable
  attr_reader :cents

  def initialize(cents)
    @cents = cents
  end

  def <=>(other)              # define this once...
    cents <=> other.cents
  end
end

Money.new(100) < Money.new(200)   # => true — < came free from Comparable
```

---

## 12. Method Aliases

Lets you give an existing method another name — useful for readability or backward compatibility.

```ruby
class Stack
  def push(item)
    # ...
  end
  alias_method :add, :push       # method form, works at runtime

  alias enqueue push              # keyword form (no colons, no commas) — works at parse time
end

# Common real-world example: built into Ruby itself
[1, 2, 3].length   # length and size are aliases of each other
[1, 2, 3].size
```

---

## 13. File I/O

```ruby
# Reading an entire file
content = File.read("notes.txt")

# Reading line by line (memory-efficient for big files)
File.open("notes.txt", "r") do |file|
  file.each_line { |line| puts line }
end
# the block form auto-closes the file when done — no need for a manual .close

# Writing (overwrites the file)
File.open("output.txt", "w") do |file|
  file.puts "Hello, file!"
end

# Appending
File.open("output.txt", "a") do |file|
  file.puts "Another line"
end

# Quick existence/metadata checks
File.exist?("notes.txt")
File.size("notes.txt")
```

---

## Quick Mental-Model Cheatsheet (Python/JS → Ruby)

| Concept | Python | JS | Ruby |
|---|---|---|---|
| None/null | `None` | `null`/`undefined` | `nil` |
| Falsy values | `0, "", [], None, False` | `0, "", null, undefined, NaN, false` | only `nil` and `false` |
| String format | f-strings | template literals | `#{}` interpolation |
| filter/map/reduce | `filter()/map()/reduce()` | `.filter()/.map()/.reduce()` | `.select/.map/.reduce` |
| Constructor | `__init__` | `constructor` | `initialize` |
| `self` | `self` | `this` | `self` (instance vars use `@` instead) |
| Multiple inheritance | yes (MRO) | no | no — use mixins (`include`) instead |
| Switch statement | `match` (3.10+) | `switch` | `case/when` |
| Lambda | `lambda x: x*x` | `x => x*x` | `->(x) { x * x }` |

The fastest way to get comfortable is to actually run snippets in `irb` (Ruby's REPL, just type `irb` in your terminal) — it's forgiving and gives instant feedback, much like a Python REPL or browser console.
