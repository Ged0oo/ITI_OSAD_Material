#include <iostream>
#include "Stack/stack.h"
using namespace std;

int main() {
    cout << "===== STACK TESTING =====\n\n";


    Stack_c<int> st(3);


    // Test 1: print empty
    cout << "[Test] Print empty stack:\n";
    st.print();
    cout << "\n";


    // Test 2: pop empty (underflow)
    cout << "[Test] Pop from empty stack:\n";
    st.pop();
    cout << "\n";


    // Test 3: peek empty
    cout << "[Test] Peek from empty stack:\n";
    st.peek();
    cout << "\n";


    // Test 4: push normally
    cout << "[Test] Push elements 10, 20, 30:\n";
    st.push(10);
    st.push(20);
    st.push(30);
    st.print();
    cout << "\n";


    // Test 5: push overflow
    cout << "[Test] Push overflow (push 40):\n";
    st.push(40); // capacity is 3
    cout << "\n";


    // Test 6: peek top element
    cout << "[Test] Peek top element:\n";
    cout << "Top = " << st.peek() << endl << "\n";


    // Test 7: pop element & print after each
    cout << "[Test] Pop all elements:\n";
    cout << "Popped: " << st.pop() << endl;
    st.print();

    cout << "Popped: " << st.pop() << endl;
    st.print();

    cout << "Popped: " << st.pop() << endl;
    st.print();

    
    // Test 8: pop underflow again
    cout << "\n[Test] Pop underflow again:\n";
    st.pop();
    cout << "\n";

    cout << "===== END OF TESTS =====\n";

    return 0;
}
