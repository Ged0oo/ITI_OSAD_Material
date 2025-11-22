#ifndef __APP_H__
#define __APP_H__


#include <dirent.h>
#include <vector>
#include <limits>

#include "../keyboard/keyboard.h"
#include "../screen/screen.h"
#include "../vi/vi.h"


#define Y_POSITION           60
#define CURSER_POSITION      55
#define CURSER_STEP          2

#define NEW_POSITION         6
#define OPEN_POSITION        NEW_POSITION + CURSER_STEP
#define EXIT_POSITION        OPEN_POSITION + CURSER_STEP


#define NEW_MESSAGE             "Touch New File"
#define OPEN_MESSAGE            "Open File"
#define EXIT_MESSAGE            "EXIT"


void init();
void updateScreen();
void setCurserPosition(int position);
void applicationLoop();
void HandleUserSelection(int pos);
void HandleNewFile();
void HandleEndKeyAction();
void HandleOpenFile();

#endif