#ifndef __LINEAR_SEARCH_H_HBB
#define __LINEAR_SEARCH_H_HBB


#include "./linearSearch.h"


template <typename T>
bool linearSearch(Node<T>* head, T target){
    while(head != nullptr){
        if(target == head->val) return true;
        head = head->next;
    }
    return false;
}


#endif //__LINEAR_SEARCH_H_HBB
