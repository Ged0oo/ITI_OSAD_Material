# Lab1 : Python

## Task 1: Logical Operators

### Use logical operators to determine if a number is within a specified range.
- Write code to check if the variable number is between start and end (inclusive). Print True if it is, and False otherwise.

```python
start = 1
end = 10
num = 5
cond = (num >= start) and (num <= end)
print(cond)
```


## Task 2: Logical AND, OR, NOT

### Use logical operators to check multiple conditions.
- Write code to determine if a person is eligible for a discount based on their age and whether they have_coupon. A person is eligible if they are either under 18 or over 65, or if they have a coupon. Print True if they are eligible, and False otherwise.

```python
age = 22
have_coupon = True
is_eligible = (age < 18) or (age > 65) or have_coupon
print(is_eligible)
```


## Task 3: String Concatenation

### Combine strings to form a complete sentence.
- Write code to create a greeting message using the variable name. The greeting should be in the format: "Hello, Name!".

```python
name = input("Enter ur name: ")
print(f"Hello, {name}!")
```


## Task 4: String Slicing

### Extract specific parts of a string.
- Write code to get the initials of a person using the variable full_name. The initials should be the first letter of the first name and the first letter of the last name.

```python
full_name = "Mohamed Nagy Mabrock"
name_parts = full_name.split()
initials = name_parts[0][0] + name_parts[-1][0]
print(initials.upper())
```


## Task 5: String Formatting

### Format strings using different methods.
- Write code to create a sentence using the variables name and age. The sentence should be in the format: "Name is Age years old."

```python
name = "Nagy"
age = 24
sentence = f"{name} is {age} years old."
print(sentence)
```