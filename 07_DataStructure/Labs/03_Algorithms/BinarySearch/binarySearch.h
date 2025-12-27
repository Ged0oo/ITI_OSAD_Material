#ifndef __INARY_SEARCH_H__
#define __INARY_SEARCH_H__


#include <iostream>
#include "../Linkedlist/Linkedlist.h"


template <typename T>
Node<T>* getMid(Node<T>* start, Node<T>* end);

template <typename T>
bool binarySearch(Node<T>* start, Node<T>* end, T target);


#include "./binarySearch.hpp"


#endif //__INARY_SEARCH_H__