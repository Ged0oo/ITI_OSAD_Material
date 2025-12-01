#include "vi.h"


string currentFilename = "";
string *buffer = nullptr;

int bufferLines = 0;
int cursorX = 0;
int cursorY = 0;


static void clearBuffer() {
    delete [] buffer;
    buffer = nullptr;
    bufferLines = 0;
}


static void pushLine(string line){
    string *newBuf = new string[bufferLines + 1];
    for(int i=0 ; i<bufferLines ; i++) newBuf[i] = buffer[i];
    newBuf[bufferLines] = line;
    delete [] buffer;
    buffer = newBuf;
    bufferLines++;
}


static void insertLine(int pos, string line){
    if(pos < 0) pos = 0;
    if(pos > bufferLines) pos = bufferLines;

    string *newBuf = new string[bufferLines + 1];
    for(int i=0 ; i<pos ; i++) newBuf[i] = buffer[i];

    newBuf[pos] = line;
    for(int i=pos ; i<bufferLines ; i++) newBuf[i] = buffer[i];

    delete [] buffer;
    buffer = newBuf;
    bufferLines++;
}


static void deleteLineAt(int pos){
    if (bufferLines <= 0) return;
    if (pos < 0 || pos >= bufferLines) return;
    if (bufferLines == 1) {
        clearBuffer();
        return;
    }    

    string *newBuf = new string[bufferLines - 1];
    for(int i=0, j=0 ; i<bufferLines ; i++){
        if(i == pos) continue;
        newBuf[j++] = buffer[i++];
    }

    delete [] buffer;
    buffer = newBuf;
    bufferLines--;
}


void drawScreen(){
    clearScreen();
    if(bufferLines == 0) pushLine("");

    for(int i = 0; i < bufferLines ; i++){
        gotoxy(1, i + 1);
        cout << buffer[i];
    }

    gotoxy(cursorX+1, cursorY+1);
    showCursor();
}


void moveCursor(int key){
    if(bufferLines == 0) return;

    switch (key) {
        case UP_KEYBOARD_STROKE:
            if(cursorY > 0) cursorY--;
            if(cursorX > buffer[cursorY].size()) cursorX = buffer[cursorY].size();
            break;

        case DOWN_KEYBOARD_STROKE:
            if(cursorY + 1 < bufferLines) cursorY++;
            if(cursorX > buffer[cursorY].size()) cursorX = buffer[cursorY].size();
            break;

        case LEFT_KEYBOARD_STROKE:
            if(cursorX > 0) cursorX--;
            else if(cursorY > 0) {
                cursorY--;
                cursorX = buffer[cursorY].size();
            }
            break;

        case RIGHT_KEYBOARD_STROKE:
            if(cursorX < (int)buffer[cursorY].size()) cursorX++;
            else if(cursorY + 1 < bufferLines) {
                cursorY++;
                cursorX = 0;
            }
            break;
    }
}


void insertChar(char c){
    if (bufferLines == 0) pushLine("");
    if(cursorY >= bufferLines) cursorY = bufferLines - 1;
    buffer[cursorY].insert(buffer[cursorY].begin() + cursorX, c);
    cursorX++;
}


void deleteChar(){
    if (bufferLines == 0 || cursorY >= bufferLines) return;

    if(cursorX > 0){
        buffer[cursorY].erase(buffer[cursorY].begin() + cursorX - 1);
        cursorX--;
    }
    else if (cursorY > 0) {
        cursorX = buffer[cursorY - 1].size();
        buffer[cursorY - 1] += buffer[cursorY];
        deleteLineAt(cursorY);
        cursorY--;
    }
}


void editorLoop(string filename) {
    cursorX = 0;
    cursorY = 0;

    if (bufferLines == 0) pushLine("");
    drawScreen();

    while(true) {
        int key = getKey();

        if(key == ESC_KEYBOARD_STROKE) break;
        else if(key == ENTER_KEYBOARD_STROKE) {
            string newLine = buffer[cursorY].substr(cursorX);
            buffer[cursorY] = buffer[cursorY].substr(0, cursorX);
            insertLine(cursorY + 1, newLine);
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
        else if(key >= SPACE_KEY_ASCII && key < DELETE_KEY_ASCII) {
            insertChar((char)key);
        }

        drawScreen();
    }
}


void loadFile(string filename){
    clearBuffer();
    ifstream file(filename);

    if(file.is_open()){
        string line;
        while (getline(file, line)) pushLine(line);
        file.close();
    }

    if(bufferLines) pushLine("");
}


void saveFile(string filename){
    ofstream file(filename);

    if(!file.is_open()){
        cerr << "Error: Could not save file " << filename << endl;
        return;
    }

    for(int i = 0; i < bufferLines; ++i) file << buffer[i] << '\n';
    file.close();
}


void appendFile(string filename){
    ofstream file(filename, ios::app);

    if(!file.is_open()){
        cerr << "Error: Could not append to file " << filename << endl;
        return;
    }

    for(int i = 0; i < bufferLines; ++i) file << buffer[i] << '\n';
    file.close();
}