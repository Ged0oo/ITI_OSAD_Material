#ifndef __NODE_H__
#define __NODE_H__

template <typename T>
class Node{
public:
    T val;
    Node<T> *next;
    Node<T> *prev;
    Node(T val);
};

#include "Node.hpp"

#endif //__NODE_H__
