#include "swap.h"

void swap_xor(int *first, int *second){
    *first  = *first ^ *second;
    *second = *first ^ *second;
    *first =  *first ^ *second;
}

void swap_plus_minus(int *first, int *second){
    *first  = *first + *second;
    *second = *first - *second;
    *first  = *first - *second;
}

void swap_temp(int *first, int *second){
    int temp = *first;
    *first   = *second;
    *second  = temp;
}

void swap_mult_div(int *first, int *second){
    *first  = *first * *second;
    *second = *first / *second;
    *first  = *first / *second;
}

void swap_std(int *first, int *second){
    std::swap(*first, *second);
}