## 1. Create a user account with the following attribute
* username: islam
* Fullname/comment: Islam Askar
* Password: islam
```bash
sudo useradd -c "Islam Asker" islam
sudo passwd islam
```


----------------------


## 2. Create a user account with the following attribute
* username: baduser
* Fullname/comment: Bad User
* Password: baduser
```bash
sudo useradd -c "Bad User" baduser
sudo passwd baduser
```

----------------------


## 3. Create a supplementary (Secondary) group called pgroup with group ID of 30000
```bash
sudo groupadd -g 30000 pgroup
```


----------------------


## 4. Create a supplementary group called badgroup
```bash
sudo groupadd badgroup
```


----------------------


## 5. Add islam user to the pgroup group as a supplementary group
```bash
sudo usermod -aG badgroup islam
```


----------------------


## 6. Modify the password of islam's account to password
```bash
sudo passwd islam
```


----------------------


## 7. Modify islam's account so the password expires after 30 days
```bash
sudo chage -M 30 islam
```


----------------------


## 8. Lock bad user account so he can't log in
```bash
sudo usermod -L baduser
```


----------------------


## 9. Delete bad user account
```bash
sudo userdel baduser
```


----------------------


## 10. Delete the supplementary group called badgroup.
```bash
sudo groupdel badgroup
```


----------------------


## 13. Create a folder called myteam in your home directory and change its permissions to read only for the owner
```bash
mkdir ~/myteam
chmod 400 ~/myteam
```


----------------------


## 14. Log out and log in by another user
```bash
su - islam
```


----------------------


## 15. Try to access (by cd command) the folder (myteam)
```bash
nagy@ZenBook-UX425EA:~$ cd ~/myteam/
bash: cd: /home/nagy/myteam/: Permission denied
```
- and this is because we haven't got execute permisions


------------------------


## 16. Using the command Line
* Change the permissions of oldpasswd file to give owner read and write permissions and for group write and execute and execute only for the others (using chmod in 2 different ways)
```bash
nagy@ZenBook-UX425EA:~$ chmod 631 ~/Desktop/passwd 
nagy@ZenBook-UX425EA:~$ ll ~/Desktop/passwd 
-rw--wx--x 1 nagy nagy 3509 Oct 26 19:15 /home/nagy/Desktop/passwd*
```

* Change your default permissions to be as above
```bash
umask 035
```

* What is the maximum permission a file can have, by default when it is just 
created? And what is that for directory.
```bash
for file: 666
for directory: 777
```

* Change your default permissions to be no permission to everyone then create a 
directory and a file to verify.
```bash
nagy@ZenBook-UX425EA:~$ umask 777
nagy@ZenBook-UX425EA:~$ touch testfile
nagy@ZenBook-UX425EA:~$ ll testfile 
---------- 1 nagy nagy 0 Oct 26 19:22 testfile
```


------------------------


## 17. What are the minimum permission needed for
* Copy a directory (permission for source directory and permissions for target 
parent directory)
```bash
source: r+x
target: w+x
```

* Copy a file (permission for source file and and permission for target parent 
directory)
```bash
source: r
target: w+x
```

* Delete a file
```bash
w+x
```

* Change to a directory
```bash
x
```

* List a directory content (ls command)
```bash
r+x
```

* View a file content (more/cat command)
```bash
r
```

* Modify a file content
```bash
w
```


----------------------


## 18. Create a file with permission 444. Try to edit in it and to remove it? Note what happened. 
```bash
nagy@ZenBook-UX425EA:~$ touch test
nagy@ZenBook-UX425EA:~$ chmod 444 test
nagy@ZenBook-UX425EA:~$ ll test
-r--r--r-- 1 nagy nagy 0 Oct 26 19:32 test
nagy@ZenBook-UX425EA:~$ 
nagy@ZenBook-UX425EA:~$ echo "Hello World" >> test
bash: test: Permission denied
nagy@ZenBook-UX425EA:~$ 
nagy@ZenBook-UX425EA:~$ rm test
```

- we can’t modify or overwrite the file because there’s no write permission.

- Deleting a file doesn’t depend on the file’s own permissions. It depends on write (w) and execute (x) permissions of the directory containing it.


----------------------


## 19. What is the difference between the “x” permission for a file and for a directory.
- For directory: allow to access the directory with cd
- For file: allow to run or execute executable files or scripts