#ifndef __NODE_HPP__
#define __NODE_HPP__


template <typename T>
Node<T>::Node(T val) {
    this->val = val;
    next = nullptr;
    prev = nullptr;
}


#endif //__NODE_HPP__