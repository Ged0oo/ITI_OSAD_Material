# Queue/Dequeue Data Structure Implementation

## Lab 02: Deque Implementation

This project implements a **Double-Ended Queue (Deque)** data structure in C++ using a doubly-linked list. The implementation supports efficient insertions and deletions from both ends, providing both queue (FIFO) and stack (LIFO) operations with dynamic sizing.

## Project Structure

```
02_Queue/
├── main.cpp              # Main test program
├── Makefile              # Build configuration
├── Queue/
│   └── Queue.h          # Deque class declaration and implementation
├── Linkedlist/
│   └── Linkedlist.h     # Doubly-linked list implementation
├── Node/
│   ├── Node.h           # Node class declaration
│   └── Node.hpp         # Node class implementation
└── README.md            # This documentation
```

## Features

- **Doubly-Linked List Implementation**: Dynamic sizing with efficient operations
- **Double-Ended Operations**: Insert/delete from both front and rear
- **Template-Based**: Generic implementation supporting any data type
- **Memory Management**: Automatic allocation/deallocation with proper cleanup
- **Exception Handling**: Uses C++ exceptions for error conditions
- **Comprehensive Testing**: Complete test suite in main.cpp

## Class Interfaces

### Queue (Deque) Class (Queue.h)

```cpp
template <typename T>
class Queue {
private:
    Linkedlist<T> *list;    // Underlying doubly-linked list

public:
    Queue();                        // Constructor
    ~Queue();                       // Destructor

    // Core Operations
    void insertRear(T item);        // Add element to rear
    void insertFront(T item);       // Add element to front
    T deleteFront();                // Remove element from front
    T deleteRear();                 // Remove element from rear

    // Utility Operations
    void display();                 // Print all elements
    bool isEmpty();                 // Check if deque is empty
};
```

### Linkedlist Class (Linkedlist.h)

```cpp
template <typename T>
class Linkedlist {
public:
    Node<T> *head;                  // Head pointer
    Node<T> *tail;                  // Tail pointer

    // Core Operations
    void insert(T val);             // Insert at rear
    void insertFront(T val);        // Insert at front
    T removeFront();                // Remove from front
    T removeRear();                 // Remove from rear

    // Additional Operations
    void printList();               // Display list
    int getNumberNodesCount();      // Get size
    // ... other utility methods
};
```

### Node Class (Node.h)

```cpp
template <typename T>
class Node {
public:
    T val;                          // Data value
    Node<T> *next;                  // Next pointer
    Node<T> *prev;                  // Previous pointer

    Node(T val);                    // Constructor
};
```

## Implementation Details

### Constructor & Destructor
```cpp
template <typename T>
Queue<T>::Queue() {
    list = new Linkedlist<T>();     // Create empty linked list
}

template <typename T>
Queue<T>::~Queue() {
    delete list;                    // Free linked list memory
}
```

### Boundary Conditions
```cpp
template <typename T>
bool Queue<T>::isEmpty() {
    return list->head == nullptr;   // Check if list is empty
}
```

### Insert Operations

**Insert Rear:**
```cpp
template <typename T>
void Queue<T>::insertRear(T item) {
    list->insert(item);             // Add to tail of linked list
}
```

**Insert Front:**
```cpp
template <typename T>
void Queue<T>::insertFront(T item) {
    list->insertFront(item);        // Add to head of linked list
}
```

### Delete Operations

**Delete Front:**
```cpp
template <typename T>
T Queue<T>::deleteFront() {
    if(isEmpty()) {
        cout << "The Queue is Empty" << endl;
        throw out_of_range("Queue is empty");
    }
    return list->removeFront();     // Remove from head
}
```

**Delete Rear:**
```cpp
template <typename T>
T Queue<T>::deleteRear() {
    if(isEmpty()) {
        cout << "The Queue is Empty" << endl;
        throw out_of_range("Queue is empty");
    }
    return list->removeRear();      // Remove from tail
}
```

### Display Function
```cpp
template <typename T>
void Queue<T>::display() {
    if(isEmpty()) {
        cout << "Empty Queue" << endl;
        return;
    }
    list->printList();              // Use linked list's print method
}
```

### Linked List Operations

**Insert at Rear:**
```cpp
template <typename T>
void Linkedlist<T>::insert(T val) {
    Node<T> *node = new Node(val);
    if(head == nullptr) {
        head = tail = node;         // First node
        return;
    }
    tail->next = node;              // Add to end
    node->prev = tail;
    tail = node;
}
```

**Insert at Front:**
```cpp
template <typename T>
void Linkedlist<T>::insertFront(T val) {
    Node<T> *node = new Node(val);
    if(head == nullptr) {
        head = tail = node;         // First node
        return;
    }
    node->next = head;              // Add to beginning
    head->prev = node;
    head = node;
}
```

**Remove from Front:**
```cpp
template <typename T>
T Linkedlist<T>::removeFront() {
    if(head == nullptr) throw out_of_range("List is empty");
    T val = head->val;
    Node<T> *temp = head;
    head = head->next;
    if(head != nullptr) head->prev = nullptr;
    else tail = nullptr;
    delete temp;
    return val;
}
```

**Remove from Rear:**
```cpp
template <typename T>
T Linkedlist<T>::removeRear() {
    if(tail == nullptr) throw out_of_range("List is empty");
    T val = tail->val;
    Node<T> *temp = tail;
    tail = tail->prev;
    if(tail != nullptr) tail->next = nullptr;
    else head = nullptr;
    delete temp;
    return val;
}
```

## Building and Running

### Using Makefile (Recommended)
```bash
# Build the project
make

# Clean build files
make clean
```

### Manual Compilation
```bash
# Compile with g++
g++ -std=c++17 -o app main.cpp

# Run the program
./app
```

## Test Cases (main.cpp)

The test program demonstrates all deque operations:

1. **Insert Rear Operations**: Adds elements 10, 20, 30 to rear
2. **Insert Front Operations**: Adds elements 5, 1 to front
3. **Delete Front**: Removes element from front
4. **Delete Rear**: Removes element from rear
5. **Dynamic Sizing Test**: No capacity limits, can add unlimited elements
6. **Empty Queue Test**: Attempts deletion when queue is empty (throws exception)

### Expected Output
```
=== Deque (Double-Ended Queue) Implementation Test ===

Testing insertRear operations:
After inserting 10, 20, 30 from rear:
10 <-> 20 <-> 30 <-> NULL

Testing insertFront operations:
After inserting 5, 1 from front:
1 <-> 5 <-> 10 <-> 20 <-> 30 <-> NULL

Testing deleteFront operation:
Deleted from front: 1
Queue after deleteFront:
5 <-> 10 <-> 20 <-> 30 <-> NULL

Testing deleteRear operation:
Deleted from rear: 30
Queue after deleteRear:
5 <-> 10 <-> 20 <-> NULL

Testing full queue condition:
After adding more elements:
5 <-> 10 <-> 20 <-> 40 <-> 50 <-> NULL
Trying to insert when full:

Testing empty queue condition:
After emptying the queue:
50 <-> NULL
Trying to delete from empty queue:
The Queue is Empty
terminate called after throwing an instance of 'std::out_of_range'
  what():  Queue is empty
Aborted (core dumped)
```

## Key Concepts Demonstrated

1. **Doubly-Linked List**: Bidirectional traversal with prev/next pointers
2. **Dynamic Memory Management**: Node allocation/deallocation
3. **Template Programming**: Generic data structures in C++
4. **Exception Handling**: C++ standard exceptions for error conditions
5. **Double-Ended Operations**: Both queue and stack functionality
6. **Class Composition**: Building complex ADTs from simpler components

## Learning Objectives

This implementation demonstrates:
- Abstract Data Type (ADT) implementation with templates
- Doubly-linked list data structure
- Memory management in C++ (new/delete)
- Exception handling with std::out_of_range
- Class design and encapsulation
- Template metaprogramming basics

## Technical Details

- **Time Complexity**: O(1) for all operations (front/rear insert/delete)
- **Space Complexity**: O(n) where n is the number of elements
- **Memory Usage**: Dynamic allocation, grows/shrinks as needed
- **Thread Safety**: Not thread-safe (single-threaded design)
- **Error Handling**: Throws std::out_of_range for empty deque operations
- **Data Type**: Generic template supporting any type T

---

**Course**: Data Structures - Lab 02
**Institution**: ITI (Information Technology Institute)
**Implementation**: Doubly-Linked List-based Deque