#include "emp.h"


void EmployeeManager::addEmployee(const Employee& emp) {
    employees.push_back(emp);
}


void EmployeeManager::displayAllEmployees() const {
    if (employees.empty()) {
        cout << "No employees found." << endl;
        return;
    }
    for (size_t i = 0; i < employees.size(); i++) {
        cout << i+1 << ". Name: "   << employees[i].name 
             <<        " | ID: "    << employees[i].id 
             <<        " | Dept: "  << employees[i].department << endl;
    }
}


bool EmployeeManager::saveToFile(const string& filename) {
    ofstream file(filename, ios::trunc);
    if (!file.is_open()) return false;
    
    for (const auto& emp : employees) {
        file << emp.name << "," << emp.id << "," << emp.department << "\n";
    }

    file.close();
    return true;
}


bool EmployeeManager::loadFromFile(const string& filename) {
    ifstream file(filename);
    if (!file.is_open()) {
        cout << "File not found." << endl;
        return false;
    }
    
    string line;
    while (getline(file, line)) {
        if (line.empty()) continue;
        
        stringstream ss(line);
        string name, id, department;
        
        if (getline(ss, name, ',') && getline(ss, id, ',') && getline(ss, department, ',')) {
            Employee emp;
            emp.name = name;
            emp.id = id;
            emp.department = department;
            employees.push_back(emp);
        }
    }

    file.close();
    cout << "Loaded " << employees.size() << " employees." << endl;
    return true;
}


int EmployeeManager::getEmployeeCount() const {
    return employees.size();
}