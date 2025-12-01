#include "app.h"

bool selectFlag = false;
bool quiteFlag = false;
int curPos = NEW_POSITION;
EmployeeManager empManager;

void init(){
    hideCursor();
    atexit(showCursor);
    atexit(restoreTerminal);
    empManager.loadFromFile("employees.dat");
    updateScreen();
}

void updateScreen(){
    if(selectFlag == false){
        clearScreen();
        printMsgWithColorInPosition(NEW_MESSAGE, WHITE_COLOR, Y_POSITION, NEW_POSITION);
        printMsgWithColorInPosition(DISPLAY_MESSAGE, WHITE_COLOR, Y_POSITION, DISPLAY_POSITION);
        printMsgWithColorInPosition(EXIT_MESSAGE, WHITE_COLOR, Y_POSITION, EXIT_POSITION);
    }
}

void setCurserPosition(int position){
    if(selectFlag == false){
        updateScreen();
        printMsgWithColorInPosition("->", WHITE_COLOR, CURSER_POSITION, position);
    }
}

void applicationLoop() {
    const int MIN_POS = NEW_POSITION;
    const int MAX_POS = EXIT_POSITION;
    const int STEP = CURSER_STEP;
    const int ITEMS = (MAX_POS - MIN_POS) / STEP + 1;

    int idx = 0;
    curPos = MIN_POS + idx * STEP;

    while (1) {
        if(quiteFlag == true){
            clearScreen();
            return;
        }
        
        setCurserPosition(curPos);
        int ch = getKey();

        switch (ch) {
            case ENTER_KEYBOARD_STROKE:
                selectFlag = true;
                HandleUserSelection(curPos);
                break;

            case BACKSPACE_KEYBOARD_STROKE:
                selectFlag = false;
                break;

            case ESC_KEYBOARD_STROKE:
                quiteFlag=true;
                break;

            case UP_KEYBOARD_STROKE:
            case RIGHT_KEYBOARD_STROKE:
                if (!selectFlag) idx--;
                break;

            case DOWN_KEYBOARD_STROKE:
            case LEFT_KEYBOARD_STROKE:
                if (!selectFlag) idx++;
                break;

            case HOME_KEYBOARD_STROKE:
                if (!selectFlag) idx = 0;
                break;

            case END_KEYBOARD_STROKE:
                if (!selectFlag) idx = ITEMS - 1;
                break;

            default: continue;
        }

        idx = (idx % ITEMS + ITEMS) % ITEMS;
        curPos = MIN_POS + idx * STEP;
    }
}

void HandleUserSelection(int pos){
    clearScreen();
    switch (pos) {
        case NEW_POSITION:      
            AddNewEmployee();
            break;

        case DISPLAY_POSITION:  
            DisplayAllEmployees();
            break;

        case EXIT_POSITION:     
            printMsgWithColorInPosition(EXIT_MESSAGE, BLUE_COLOR, Y_POSITION, EXIT_POSITION);    
            delay_s(1);  
            quiteFlag=true;    
            break;
    }
    printMsgWithColorInPosition("->", WHITE_COLOR, CURSER_POSITION, pos);
}

void AddNewEmployee(){
    clearScreen();
    printMsgWithColorInPosition(NEW_MESSAGE, RED_COLOR, Y_POSITION, NEW_POSITION);  
    
    printMsgWithColorInPosition("Enter Employee Name : ", WHITE_COLOR, Y_POSITION, NEW_POSITION+CURSER_STEP);
    string name; cin >> name;
    
    printMsgWithColorInPosition("Enter Employee ID : ", WHITE_COLOR, Y_POSITION, NEW_POSITION+ 2*CURSER_STEP);
    string id; cin >> id;

    printMsgWithColorInPosition("Enter Employee Department : ", WHITE_COLOR, Y_POSITION, NEW_POSITION + 3*CURSER_STEP);
    string dep; cin >> dep;
    
    Employee emp;
    emp.name = name;
    emp.id = id;
    emp.department = dep;
    
    empManager.addEmployee(emp);
    empManager.saveToFile("employees.dat");
    
    printMsgWithColorInPosition("Employee added successfully!", GREEN_COLOR, Y_POSITION, NEW_POSITION+ 5*CURSER_STEP);
    printMsgWithColorInPosition("Press BACKSPACE to go back", WHITE_COLOR, Y_POSITION, NEW_POSITION+ 6*CURSER_STEP);
    
    while(getKey() != BACKSPACE_KEYBOARD_STROKE);
    selectFlag = false;
}


void DisplayAllEmployees(){
    clearScreen();
    printMsgWithColorInPosition(DISPLAY_MESSAGE, GREEN_COLOR, Y_POSITION, DISPLAY_POSITION); 
    
    empManager.displayAllEmployees();
    printMsgWithColorInPosition("Press BACKSPACE to go back", WHITE_COLOR, Y_POSITION, 25);
    
    while(getKey() != BACKSPACE_KEYBOARD_STROKE);
    selectFlag = false;
}