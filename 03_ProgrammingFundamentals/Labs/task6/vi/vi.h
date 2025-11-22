#ifndef __VI_H__
#define __VI_H__


#include <vector>
#include <string>
#include <fstream>


#include "../keyboard/keyboard.h"
#include "../screen/screen.h"


using namespace std;


typedef enum {
    COMMAND_MODE = 0,
    INSERT_MODE = 1,
    LAST_LINE_MODE = 2
} vi_mode_t;


extern string currentFilename;


void editorLoop(string filename);
void drawScreen();

void moveCursor(int key);
void insertChar(char c);
void deleteChar();

void loadFile(string filename);
void saveFile(string filename);
void appendFile(string filename);

void handleCommandMode(int key);
void handleInsertMode(int key);
void handleLastLineMode(int key);


#endif 

