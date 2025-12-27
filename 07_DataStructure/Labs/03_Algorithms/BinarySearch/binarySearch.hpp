#ifndef __BINARY_SEARCH_H_HBB
#define __BINARY_SEARCH_H_HBB


#include "./binarySearch.h"


template <typename T>
Node<T>* getMid(Node<T>* start, Node<T>* end){
    Node<T>* slow = start, *fast = start;
    while(fast != end && fast->next != end){
        fast = fast->next->next;
        slow = slow->next;
    }
    return slow;
}


template <typename T>
bool binarySearch(Node<T>* start, Node<T>* end, T target){
    if (start == end) return false;
    Node<T>* mid = getMid(start, end);
    if(mid->val == target) return true;
    else if(mid->val < target) return binarySearch(mid->next, end, target);
    else return binarySearch(start, mid, target);
}


#endif //__BINARY_SEARCH_H_HBB
