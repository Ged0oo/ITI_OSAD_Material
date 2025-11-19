#ifndef __APP_H__
#define __APP_H__

#include "../keyboard/keyboard.h"
#include "../screen/screen.h"
#include "../employee/emp.h"


#define Y_POSITION           60
#define CURSER_POSITION      55
#define CURSER_STEP          2

#define NEW_POSITION         6
#define DISPLAY_POSITION     NEW_POSITION + CURSER_STEP
#define EXIT_POSITION        DISPLAY_POSITION + CURSER_STEP
#define QUITE_POSITION       EXIT_POSITION + CURSER_STEP


#define NEW_MESSAGE             "Add New User"
#define DISPLAY_MESSAGE         "Display All Users"
#define EXIT_MESSAGE            "EXIT"


void init();
void updateScreen();
void setCurserPosition(int position);
void applicationLoop();
void HandleUserSelection(int pos);

void AddNewEmployee();
void DisplayAllEmployees();

#endif