## 2.What is the difference between cat and more command?
- cat: put all the content of the file on the terminal
- more: put little amount (as long as the screen size) of the file content on the screen and the move down to see more

## 3.What is the difference between rm and rmdir using man?
- rm: remove file or directory based on the given input
- rmdir: only removes empty directory

## 4.Create the following hierarchy
- mkdir -p dir1/{dir11,dir12} ; touch dir1/dir11/file1
- mkdir docs ; touch docs/mycv

### Remove dir11 in one-step. What did you notice? And how did you overcome that?
- can't use rmdir beciyse its non empty directory so, we use rm with option -r to remove it recursivly
- rm -rf dir1/dir11

### Then remove dir12 using rmdir –p command.
- rmdir -p dir1/dir12/

### The output of the command pwd was /home/user. Write the absolute and relative path for the file mycv
- relative: docs/mycv
- absolute: /home/user/docks/mycv

## 5.Copy the /etc/passwd file to your home directory making its name is mypasswd.
- cp /etc/passwd ~/mypasswd

## 6. Rename this new file to be oldpasswd.
- mv ~/mypasswd ~/oldpasswd

## 7.You are in /usr/bin, list four ways to go to your home directory
- cd
- cd ~
- cd ../../home/nagy/
- cd /home/nagy/

## 8. List Linux commands in /usr/bin that start with letter w
- ls /usr/bin/w*

## 9.Display the first 4 lines of /etc/passwd
- head -n4 /etc/passwd

## 10.Display the last 7 lines of /etc/passwd
- tail -n7 /etc/passwd

## 11.Display the man pages of passwd the command and the file sequentially in one command.
- man -a passwd

## 12.Display the man page of the passwd file.
- man -s5 passwd

## 13.Display a list of all the commands that contain the keyword passwd in their man page.
- man -k passwd
