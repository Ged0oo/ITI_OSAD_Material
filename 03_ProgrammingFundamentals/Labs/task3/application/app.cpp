#include "app.h"

int row = 0, col = 0, tableSize = 0, val = 1; 

void init() {
    do{
        cout << "Enter odd positive size integer : ";
        cin >> tableSize;

        if(tableSize <= 0) cout << "Table Size Must be +ve" << endl;
        else if(tableSize%2==0) cout << "Table Size Must be Odd" << endl;
        else if(tableSize == 1) cout << "Table Size Must be greeter than or equal 3" << endl;

    } while ((tableSize <= 2) || (tableSize%2==0));
    

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
