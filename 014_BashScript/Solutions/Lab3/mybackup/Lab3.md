# Bash Script : Lab 3

## 1. Write a script called mycase, using the case utility to checks the type of character entered by a user: a. Upper Case. b. Lower Case. c. Number. d. Nothing

```bash
#!/bin/bash
shopt -s extglob
var=$1
case "$var" in
    +([a-z])) echo "Lower Case." ;;
    +([A-Z])) echo "Upper Case." ;;
    +([0-9])) echo "Numbers." ;;
    *) echo "Invalid input." ;;
esac
```

<p align="left">
  <img src="./1.png" alt="screen" />
</p>

----------------------

## 2. Enhanced the previous script, by checking the type of string entered by a user: a. Upper Cases. b. Lower Cases. c. Numbers. d. Mix. e. Nothing. 

```bash
#!/bin/bash
shopt -s extglob
var=$1
case "$var" in
    +([a-z])) echo "Lower Case." ;;
    +([A-Z])) echo "Upper Case." ;;
    +([0-9])) echo "Numbers" ;;
    +([a-zA-Z0-9])) echo "Mixed" ;;
esac
```

<p align="left">
  <img src="./2.png" alt="screen" />
</p>

----------------------

## 3. Write a script called mychmod using for utility to give execute permission to all files and directories in your home directory.

```bash
#!/bin/bash
dir=$1
if [[ ! -d "$dir" ]]; then
    echo "wrong directory"
    exit 1
fi
for item in "$dir"/*
do
    chmod +x "$item"
done
echo "Done."
```

<p align="left">
  <img src="./3.png" alt="screen" />
</p>

----------------------

## 4. Write a script called mybackup using for utility to create a backup of only files in your home directory.

```bash
#!/bin/bash
dir=$1
if [[ ! -d "$dir" ]]; then
    echo "wrong directory"
    exit 1
fi
for item in "$dir"/*
do
    if [[ -f item ]]; then
        cp item ./mybackup
    fi
done
echo "Done."
```

<p align="left">
  <img src="./4.png" alt="screen" />
</p>

----------------------

## 1. Create a script that asks for user name then send a greeting to him.

```bash
#!/usr/bin/bash
read -p "What's Your name: " name
echo "Hi ${name}"
```

<p align="left">
  <img src="./1.png" alt="screen" />
</p>

----------------------

## 1. Create a script that asks for user name then send a greeting to him.

```bash
#!/usr/bin/bash
read -p "What's Your name: " name
echo "Hi ${name}"
```

<p align="left">
  <img src="./1.png" alt="screen" />
</p>

----------------------

## 1. Create a script that asks for user name then send a greeting to him.

```bash
#!/usr/bin/bash
read -p "What's Your name: " name
echo "Hi ${name}"
```

<p align="left">
  <img src="./1.png" alt="screen" />
</p>

----------------------

## 1. Create a script that asks for user name then send a greeting to him.

```bash
#!/usr/bin/bash
read -p "What's Your name: " name
echo "Hi ${name}"
```

<p align="left">
  <img src="./1.png" alt="screen" />
</p>

----------------------

## 1. Create a script that asks for user name then send a greeting to him.

```bash
#!/usr/bin/bash
read -p "What's Your name: " name
echo "Hi ${name}"
```

<p align="left">
  <img src="./1.png" alt="screen" />
</p>

----------------------

## 1. Create a script that asks for user name then send a greeting to him.

```bash
#!/usr/bin/bash
read -p "What's Your name: " name
echo "Hi ${name}"
```

<p align="left">
  <img src="./1.png" alt="screen" />
</p>