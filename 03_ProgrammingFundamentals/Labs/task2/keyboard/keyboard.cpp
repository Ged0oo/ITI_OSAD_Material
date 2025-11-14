#include "keyboard.h"
#include <iostream>
#include <termios.h>
#include <unistd.h>
using namespace std;

termios originalTerminal;

void restoreTerminal() {
    tcsetattr(STDIN_FILENO, TCSANOW, &originalTerminal);
}

void enableRowMode() {
    static bool enabled = false;
    if (enabled) return;

    tcgetattr(STDIN_FILENO, &originalTerminal);

    termios temp = originalTerminal;
    temp.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(STDIN_FILENO, TCSANOW, &temp);

    atexit(restoreTerminal); // auto restore on program exit
    enabled = true;
}

int readChar() {
    enableRowMode();
    return getchar();
}

int decodeEscapeSequence() {
    int c2 = readChar(); // '[' or 'O' or number
    if (c2 != '[' && c2 != 'O')
        return 27; // plain ESC

    int c3 = readChar();

    // Case 1: ESC O H / ESC O F
    if (c2 == 'O') {
        if (c3 == 'H') return 1005; // HOME
        if (c3 == 'F') return 1006; // END
    }

    // Case 2: ESC [ A/B/C/D/H/F (arrows + home/end)
    switch (c3) {
        case 'A': return 1001; // UP
        case 'B': return 1002; // DOWN
        case 'C': return 1003; // RIGHT
        case 'D': return 1004; // LEFT
        case 'H': return 1005; // HOME
        case 'F': return 1006; // END
    }

    // Case 3: ESC [ 1 ~  or  ESC [ 4 ~
    if (c3 == '1') {
        int c4 = readChar();
        if (c4 == '~') return 1005; // HOME
    }
    if (c3 == '4') {
        int c4 = readChar();
        if (c4 == '~') return 1006; // END
    }

    return 27; // fallback to ESC
}

int getKey() {
    int ch = readChar();
    if (ch != 27)
        return ch;
    else
        return decodeEscapeSequence();
}

void printDetectedKey() {
    int ch = getKey();
    string str;

    switch (ch) {
        case 27:    str = "ESC"; break;
        case 1001:  str = "UP"; break;
        case 1002:  str = "Down"; break;
        case 1003:  str = "Right"; break;
        case 1004:  str = "Left"; break;
        case 1005:  str = "Home"; break;
        case 1006:  str = "End"; break;
        default:
            cout << "You pressed: " << (char)ch << " (" << ch << ")" << endl;
            return;
    }

    cout << "You pressed: " << str << endl;
}
