#include <iostream>

#include "swap.h"

using namespace std;

int main(void){
    int x = 10, y = 20;
    cout << "x: " << x << "\t y: " << y << endl;

    swap_temp(&x, &y);
    cout << "x: " << x << "\t y: " << y << endl;

    swap_std(&x, &y);
    cout << "x: " << x << "\t y: " << y << endl;

    swap_plus_minus(&x, &y);
    cout << "x: " << x << "\t y: " << y << endl;

    swap_mult_div(&x, &y);
    cout << "x: " << x << "\t y: " << y << endl;

    swap_xor(&x, &y);
    cout << "x: " << x << "\t y: " << y << endl;
    
    return 0;
}