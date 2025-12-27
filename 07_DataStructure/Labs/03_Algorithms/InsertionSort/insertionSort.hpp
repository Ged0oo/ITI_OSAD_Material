#ifndef __INSERTION_SORT_HPP__
#define __INSERTION_SORT_HPP__


template <typename T>
void insertionSort(Linkedlist<T>& list) {
    if (!list.head || !list.head->next) return;

    Node<T>* current = list.head->next;

    while (current) {
        T key = current->val;
        Node<T>* previous = current->prev;
        
        while (previous && previous->val > key) {
            previous->next->val = previous->val;
            previous = previous->prev;
        }

        if (previous) previous->next->val = key;
        else list.head->val = key;

        current = current->next;
    }
}

#endif // __INSERTION_SORT_HPP__
