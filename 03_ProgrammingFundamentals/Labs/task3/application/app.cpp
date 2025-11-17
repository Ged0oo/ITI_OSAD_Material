#include "app.h"

int row = 0, col = 0, tableSize = 0, val = 1; 

void init() {
    cout << "Enter odd positive size integer : ";
    cin >> tableSize;
    val = 1;
    row = 1;
    col = (tableSize + 1) / 2;
    clearScreen();
}

void applicationLoop() {
    do {
        gotoxy(col * 5, row);
        cout << setw(5) << val << flush;
        delay_s(1);

        if (val % tableSize == 0) row++;
        else { row--;  col--; }

        if (row == 0) row = tableSize;
        if (col == 0) col = tableSize;

        val++;
    } while (val <= tableSize * tableSize);
}
