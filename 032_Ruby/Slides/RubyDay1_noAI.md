Ruby is a **dynamic** and **strongly typed** language

asdf (instead of rvm): The Multiple Runtime Version Manager => to install different languages versions.
pry: interactive ruby shell => `gem install pry`

```ruby
puts "I Hate World!"  #prints in new line and show return value
print("I Hate World!"  #prints and show return value
p ("I Hate World!"
```

`a.methds`  => returns array of all possible methods in the class we can use (return array of symbols)

```ruby
a[2, 3] #fron index 2 get 3 elemnts
a[2..3] #from index 2 to 3

a.capitalize # pass by value -> returns capitalize the word (first char is uppercase)
a.capitalize! # pass by value -> changing in the actual value of the a
a.match? # ? -> retuns boolean,

digits.reject{|ele| else < 5} # reject all numbers less than 5
```

Note: if you will return your boolean in your method you have to put `?` at the end of it's name (by convention).

`Symbol` ( :varName ) => object ID is assigned when the symbol is first created and will remain absolutely constant for the entire duration of that runtime (that's not the case with `String`)

`ri type.method` -> `ri Range.reject` => prints docs of this method

`{|ele| ele < 5}` **code block** is like arrow function in Js `(ele => ele < 5)`

`nil` is no more than a class.

```ruby
x, y = 5, 10 # x=5, y=10 
x, y = y, x # swap
x = 1,2,3 # x = [1,2,3]
x, = 1,2,3  # x = 1
x, y = 1,2,3 # x=1  y=2
```

in function you don't return will be replaced with last return value in the method
```ruby
alias same_old_method oldmtd # just copy implimintation not same refrence
# as if you changed same_old_mtd , oldmtd will not be reflected
```
Note: we can re-define method (with same name) with no error => you will get the last implementation (over write)
if there is different signature in the detention also will overwrite as method name is just a `Symbol` -> same object Id


```ruby
if x == 5
	puts "x equlas 5"
end
puts "x equlas 5" if x == 5
puts "not ten" x != 10
puts "not ten" unless x == 10 # unless same as if not
```
 
