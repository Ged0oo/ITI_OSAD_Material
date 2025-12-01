#ifndef __KEYBOARD_H__
#define __KEYBOARD_H__


#include <iostream>
#include <string>

#include <chrono>
#include <thread>

#include <sys/select.h>
#include <unistd.h>


using namespace std;

#if defined(_WIN32) || defined(_WIN64)
#include <windows.h>
#include <conio.h>
#else
#include <termios.h>
#include <unistd.h>
#include <time.h>
extern termios originalTerminal;
#endif


#define ESC_KEYBOARD_STROKE        27
#define UP_KEYBOARD_STROKE         1001
#define DOWN_KEYBOARD_STROKE       1002
#define RIGHT_KEYBOARD_STROKE      1003
#define LEFT_KEYBOARD_STROKE       1004
#define HOME_KEYBOARD_STROKE       1005
#define END_KEYBOARD_STROKE        1006
#define ENTER_KEYBOARD_STROKE      1007
#define BACKSPACE_KEYBOARD_STROKE  1008

#define SPACE_KEY_ASCII        32
#define DELETE_KEY_ASCII          127


int getKey();
int decodeEscapeSequence();
int readChar();
void enableRowMode();
void restoreTerminal();
void printDetectedKey();

#endif