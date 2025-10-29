## 2. Open mycv file using vi command then: Without using arrows state how to: 
* Move the cursor down one line at time. 
```bash
j
```

* Move the cursor up one line at time. 
```bash
k
```

* Search for word age 
```bash
/age
```

* Step to line 5 (assuming that you are in line 1 and file is more than 5 lines). 
```bash
:5
```

* Delete the line you are on and line 5. 
```bash
:.d
:5d
```

* How to step to the end of line and change to writing mode in one-step. 
```bash
A
```


----------------------


## 3. List the available shells in your system. 
```bash
cat /etc/shells
```


----------------------


## 4. List the environment variables in your current shell.  
```bash
env
printenv
```


----------------------


## 5. List all of the environment variables for the bash shell.  
```bash
env
```


----------------------


## 6. What are the commands that list the value of a specific variable? 
```bash
printenv
```


----------------------


## 7. Display your current shell name. 
```bash
echo $SHELL
```


----------------------


## 8. State the initialization files of: sh, ksh, bash. 
* sh -> /etc/profile, ~/.profile
* ksh -> /etc/profile, ~/.profile
* bash -> /etc/profile, ~/.profile, ~/.bash_profile, ~/.bash_login


----------------------


## 9. Edit in your profile to display date at login and change your prompt permanently.  
```bash
vim ~/.bash_profile
date
PS1="HelloNagy"
```


----------------------


## 10. Execute the following command :   
```bash
echo \ 
```
* writing over multiple lines or continue this command on the next line.
* writing value in PS2 will change the ">" character.


----------------------


## 10. Create a Bash shell alias named ls for the “ls –l” command 
```bash
alias ll="ls -l"
```



