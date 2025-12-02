#include "basetype.h"


Integer::Integer(int v) : val(v) {}
Float::Float(float v) : val(v) {}
Character::Character(char v) : val(v) {}
String::String(string v) : val(v) {}
Boolean::Boolean(bool v) : val(v) {}


basetype* detectType(const string& input){
    int intVal;
    float floatVal;

    bool isInt = true;
    bool isFloat = true;


    try{
        size_t idx;
        intVal = stoi(input, &idx);
        if(idx != input.length()){isInt = false;}
    } catch(...) {isInt = false;}
    if(isInt) {return new Integer(intVal);}


    try{
        size_t idx;
        floatVal = stof(input, &idx);
        if(idx != input.length()){isFloat = false;}
    } catch(...) {isFloat = false;}
    if(isFloat) {return new Float(floatVal);}

    if(input == "true") {return new Boolean(true);}
    else if(input == "false") {return new Boolean(false);}

    if(input.length() == 1) {return new Character(input[0]);}
    return new String(input);
}