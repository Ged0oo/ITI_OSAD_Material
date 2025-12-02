#include <iostream>
#include "Stack/stack.h"
using namespace std;

int main() {

    cout << "\n===== TEST 1: BASIC PUSH & PRINT =====\n";
    Stack_c<int> st(3);
    st.push(10);
    st.push(20);
    st.push(30);
    st.print();


    cout << "\n===== TEST 2: COPY CONSTRUCTOR =====\n";
    Stack_c<int> copySt(st);
    copySt.print();


    cout << "\n===== TEST 3: COPY ASSIGNMENT =====\n";
    Stack_c<int> assignedSt;
    assignedSt = st;
    assignedSt.print();


    cout << "\n===== TEST 4: MOVE CONSTRUCTOR =====\n";
    Stack_c<int> moveCtorSt(Stack_c<int>(5));
    moveCtorSt.push(111);
    moveCtorSt.push(222);
    moveCtorSt.print();


    cout << "\n===== TEST 5: MOVE ASSIGNMENT =====\n";
    Stack_c<int> moveAssignSt;
    moveAssignSt = Stack_c<int>(4);
    moveAssignSt.push(7);
    moveAssignSt.push(9);
    moveAssignSt.print();


    cout << "\n===== TEST 6: SELF COPY ASSIGNMENT (should be safe) =====\n";
    assignedSt = assignedSt;
    assignedSt.print();


    cout << "\n===== TEST 7: SELF MOVE ASSIGNMENT (should NOT crash) =====\n";
    moveAssignSt = std::move(moveAssignSt);
    moveAssignSt.print();


    cout << "\n===== TEST 8: COPY OF EMPTY STACK =====\n";
    Stack_c<int> emptySt;
    Stack_c<int> emptyCopy(emptySt);
    emptyCopy.print();


    cout << "\n===== TEST 9: MOVE OF EMPTY STACK =====\n";
    Stack_c<int> emptyMove(std::move(emptySt));
    emptyMove.print();


    cout << "\n===== ALL TESTS COMPLETED SUCCESSFULLY =====\n";

    return 0;
}
