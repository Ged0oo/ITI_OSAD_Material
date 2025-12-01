#ifndef __APP_H__
#define __APP_H__

#include "../keyboard/keyboard.h"
#include "../screen/screen.h"

#define Y_POSITION           70
#define CURSER_POSITION      65
#define CURSER_STEP          2

#define NEW_POSITION         6
#define DISPLAY_POSITION     NEW_POSITION + CURSER_STEP
#define EXIT_POSITION        DISPLAY_POSITION + CURSER_STEP
#define QUITE_POSITION       EXIT_POSITION + CURSER_STEP


#define NEW_MESSAGE             "NEW"
#define DISPLAY_MESSAGE         "DISPLAY"
#define EXIT_MESSAGE            "EXIT"
#define QUITE_MESSAGE           "QUITE"



void init();
void updateScreen();
void setCurserPosition(int position);
void applicationLoop();
void HandleUserSelection(int pos);

#endif