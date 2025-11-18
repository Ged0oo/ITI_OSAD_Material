#include "str.h"

int str_len(char arr[]){
    if(!arr) return 0;
    int size = 0;
    while(arr[size]) size++;
    return size;
}


int str_cpy(char src[], char des[], int desSize){
    if(!src || !des) return -1;
    int sizeSrc = str_len(src);

    if(desSize <= sizeSrc) 
        return -1;

    for (int i = 0; i <= sizeSrc; ++i)
        des[i] = src[i];

    return 0;
}


int str_cmp(const char str1[], const char str2[]){
    if(!str1 || !str2) {
        if(str1 == str2) return 0;
        return (str1 ? 1 : -1);
    }

    int i = 0;
    while (str1[i] && str2[i]) {
        if (str1[i] < str2[i]) return -1;
        if (str1[i] > str2[i]) return 1;
        i++;
    }

    if (str1[i] == str2[i]) return 0;
    return (str1[i] ? 1 : -1);
}


void str_tolower(char str[]){
    if(!str) return;
    int i=0;
    while (str[i]){
        if(str[i] >= 'A' && str[i] <= 'Z') str[i] = (char)(str[i] + 32);
        i++;
    }
}


void str_toupper(char str[]){
    if(!str) return;
    int i=0;
    while (str[i]){
        if(str[i] >= 'a' && str[i] <= 'z') str[i] = (char)(str[i] - 32);
        i++;
    }
}


int str_concat(char str1[], char str2[], int str1Size){
    if(!str1 || !str2) return -1;
    int str1Len = str_len(str1);
    int str2Len = str_len(str2);
    
    if(str1Size <= (str1Len + str2Len)) 
        return -1;

    for(int i=0 ; i<=str2Len ; i++){
        str1[str1Len + i] = str2[i];
    }

    return 0;
}
