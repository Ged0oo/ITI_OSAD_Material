#ifndef __BUBBLE_SORT_HPP__
#define __BUBBLE_SORT_HPP__


template <typename T>
void bubbleSort(Linkedlist<T>& list){
    if(!list.head || !list.head->next) return;
    Node<T> *end = nullptr;
    bool swapped = false;
    
    do{
        swapped = false;
        Node<T> *cur = list.head;
        while(cur->next != end){
            if(cur->val > cur->next->val){
                std::swap(cur->val, cur->next->val);
                swapped = true;
            }
            cur = cur->next;
        }
        end = cur;
    } while(swapped);
}


#endif //__BUBBLE_SORT_HPP__
