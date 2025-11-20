#ifndef __EMPLOYEE_H__
#define __EMPLOYEE_H__

#include <string>
#include <vector>
#include <iostream>
#include <fstream>
#include <sstream>

using namespace std;

struct Employee {
    string id;
    string name;
    string department;
};

struct EmployeeManager {
private:
    vector<Employee> employees;
    
public:
    void addEmployee(const Employee& emp);
    void displayAllEmployees() const;
    bool saveToFile(const string& filename);
    bool loadFromFile(const string& filename);
    int getEmployeeCount() const;
};

#endif