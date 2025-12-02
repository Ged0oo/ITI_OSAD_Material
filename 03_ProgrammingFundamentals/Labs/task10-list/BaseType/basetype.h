#ifndef __BASE_TYPE_H__
#define __BASE_TYPE_H__


#include <iostream>
#include <string>
using namespace std;


class basetype {
public:
    basetype(){};
    ~basetype(){};
    virtual void print() = 0;
    virtual string getType() = 0;
};


class Integer : public basetype{
private:
    int val;

public:
    Integer(int val);
    void print() override {cout << val;}
    string getType() override {return "int";}
};


class Float : public basetype{
private:
    float val;

public:
    Float(float val);
    void print() override {cout << val;}
    string getType() override {return "float";}
};


class Character : public basetype{
private:
    char val;

public:
    Character(char val);
    void print() override {cout << val;}
    string getType() override {return "char";}
};


class String : public basetype{
private:
    string val;

public:
    String(string val);
    void print() override {cout << val;}
    string getType() override {return "string";}
};


class Boolean : public basetype{
private:
    bool val;

public:
    Boolean(bool val);
    void print() override {cout << val;}
    string getType() override {return "bool";}
};


basetype* detectType(const string& input);

#endif