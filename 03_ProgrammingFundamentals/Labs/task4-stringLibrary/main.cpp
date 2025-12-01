#include <iostream>

#include "str.h"

using namespace std;

int main(void){
    char arr1[20] = "Mohamed";
    char arr2[] = "Nagy";

    str_concat(arr1, arr2, 20);
    cout << arr1 << endl;

    return 0;
}