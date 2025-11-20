#include "vi.h"

string currentFilename = "";
vector<string> buffer;
int cursorX = 0;
int cursorY = 0;

void drawScreen(){
    clearScreen();
    if(buffer.empty()) buffer.push_back("");

    for(size_t i = 0; i < buffer.size(); ++i){
        gotoxy(1, int(i) + 1);
        cout << buffer[i];
    }

    gotoxy(cursorX+1, cursorY+1);
    showCursor();
}

void moveCursor(int key){
    if(buffer.empty()) return;

    switch (key) {
        case UP_KEYBOARD_STROKE:
            if(cursorY > 0) cursorY--;
            if(cursorX > (int)buffer[cursorY].size()) cursorX = buffer[cursorY].size();
            break;

        case DOWN_KEYBOARD_STROKE:
            if(cursorY + 1 < (int)buffer.size()) cursorY++;
            if(cursorX > (int)buffer[cursorY].size()) cursorX = buffer[cursorY].size();
            break;

        case LEFT_KEYBOARD_STROKE:
            if(cursorX > 0) cursorX--;
            else if(cursorY > 0) { // move to end of previous line
                cursorY--;
                cursorX = buffer[cursorY].size();
            }
            break;

        case RIGHT_KEYBOARD_STROKE:
            if(cursorX < (int)buffer[cursorY].size()) cursorX++;
            else if(cursorY + 1 < (int)buffer.size()) { // move to start of next line
                cursorY++;
                cursorX = 0;
            }
            break;
    }
}

void insertChar(char c){
    if(buffer.empty()) buffer.push_back("");
    if(cursorY >= (int)buffer.size()) cursorY = buffer.size() - 1;

    buffer[cursorY].insert(buffer[cursorY].begin() + cursorX, c);
    cursorX++;
}

void deleteChar(){
    if(buffer.empty() || cursorY >= (int)buffer.size()) return;

    if(cursorX > 0){
        buffer[cursorY].erase(buffer[cursorY].begin() + cursorX - 1);
        cursorX--;
    }
    else if (cursorY > 0) {
        cursorX = buffer[cursorY - 1].size();
        buffer[cursorY - 1] += buffer[cursorY];
        buffer.erase(buffer.begin() + cursorY);
        cursorY--;
    }
}

void editorLoop(const string& filename) {
    currentFilename = filename;
    cursorX = 0;
    cursorY = 0;

    if(buffer.empty()) buffer.push_back("");
    drawScreen();

    while(true) {
        int key = getKey();

        if(key == ESC_KEYBOARD_STROKE) break;
        else if(key == ENTER_KEYBOARD_STROKE) {
            string newLine = buffer[cursorY].substr(cursorX);
            buffer[cursorY] = buffer[cursorY].substr(0, cursorX);
            buffer.insert(buffer.begin() + cursorY + 1, newLine);
            cursorY++;
            cursorX = 0;
        }
        else if(key == BACKSPACE_KEYBOARD_STROKE) {
            deleteChar();
        }
        else if(key == UP_KEYBOARD_STROKE ||
                key == DOWN_KEYBOARD_STROKE ||
                key == LEFT_KEYBOARD_STROKE ||
                key == RIGHT_KEYBOARD_STROKE) {
            moveCursor(key);
        }
        else if(key >= 32 && key <= 126) {
            insertChar((char)key);
        }

        drawScreen();
    }
}

void loadFile(const string& filename){
    buffer.clear();
    ifstream file(filename);

    if(file.is_open()){
        string line;
        while (getline(file, line)) buffer.push_back(line);
        file.close();
    }

    if(buffer.empty()) buffer.push_back("");
}

void saveFile(const string& filename){
    ofstream file(filename);

    if(!file.is_open()){
        cerr << "Error: Could not save file " << filename << endl;
        return;
    }

    for(const string &line : buffer) file << line << '\n';
    file.close();
}