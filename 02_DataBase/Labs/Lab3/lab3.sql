-- 1. Display the Department id, name and id and the name of its manager.
select dep.dnum, dep.dname, emp.ssn, CONCAT(emp.fname, ' ', emp.lname) AS Manager_Name
from department dep 
inner join employee emp
on dep.mgrssn = emp.ssn;


-- 2. Display the name of the departments and the name of the projects under its control.
select dep.dname, proj.pname
from department dep 
inner join project proj
on dep.dnum = proj.dnum;


-- 3. Display the full data about all the dependence associated with the name of the employee they depend on him/her.
SELECT dep.*, emp.ssn AS Employee_SSN, CONCAT(emp.fname, ' ', emp.lname) AS Employee_Name
FROM dependent dep
INNER JOIN employee emp
ON dep.essn = emp.ssn;


-- 4. Display (Using Union Function)
--     a.  The name and the gender of the dependence that's gender is Female and depending on Female Employee.
SELECT dep.dependent_name, dep.gender
FROM dependent dep
JOIN employee emp ON dep.essn = emp.ssn
WHERE dep.gender = 'F' AND emp.gender = 'F'
UNION
SELECT dep.dependent_name, dep.gender
FROM dependent dep
JOIN employee emp ON dep.essn = emp.ssn
WHERE dep.gender = 'F' AND emp.gender = 'F';

--     b.  And the male dependence that depends on Male Employee.
SELECT dep.dependent_name, dep.gender
FROM dependent dep
JOIN employee emp ON dep.essn = emp.ssn
WHERE dep.gender = 'M' AND emp.gender = 'M'
UNION
SELECT dep.dependent_name, dep.gender
FROM dependent dep
JOIN employee emp ON dep.essn = emp.ssn
WHERE dep.gender = 'M' AND emp.gender = 'M';


-- 5. Display the full names and gender of all the employees, union the names and genders of the dependents.
Select concat(emp.fname, ' ', emp.lname) AS full_name, emp.gender 
From employee emp
Union
Select dep.dependent_name, dep.gender 
From dependent dep join employee emp
On emp.ssn = dep.essn;


-- 6. Display the Id, name and location of the projects in Cairo or Alex city.
Select proj.pnumber, proj.pname, proj.city
From project proj
Where proj.city IN ('Alex', 'Cairo');


-- 7. Display the Projects full data of the projects with a name starts with "a" letter.
SELECT proj.* 
FROM project proj
WHERE proj.pname LIKE 'a%';


-- 8. display all the employees in department 30 whose salary from 1000 to 2000 LE monthly
Select emp.*
From employee emp
where emp.dno = 30 and emp.salary > 1000 and emp.salary < 2000;


-- 9. Retrieve the names of all employees in department 20 who work more than or equal to 10 hours per week on "Al Rawdah" project.
SELECT CONCAT(emp.fname, ' ', emp.lname) AS Employee_Name
FROM employee emp JOIN works_on wrk 
ON emp.ssn = wrk.essn
WHERE emp.dno = 20
	AND wrk.pno = (SELECT pnumber FROM project WHERE pname = 'Al Rawdah')
	AND wrk.weekly_hours >= 10;


-- 10. Find the names of the employees who directly supervised with Amr Omran.
SELECT CONCAT(emp.fname, ' ', emp.lname) AS Employee_Name
FROM employee emp
where emp.superssn = (select employee.ssn from employee where employee.fname = 'Amr' and employee.lname = 'Omran');


-- 11. For each project, list the project name and the total hours per week (for all employees) spent on that project.
Select proj.pname, wrk.weekly_hours
From project proj 
inner join works_on wrk
on proj.pnumber = wrk.pno;


-- 12. Retrieve the names of all employees and the names of the projects they are working on, sorted by the project name.
SELECT proj.pname AS Project_Name, CONCAT(emp.fname, ' ', emp.lname) AS Employee_Name
FROM project proj
JOIN works_on wrk ON proj.pnumber = wrk.pno
JOIN employee emp ON wrk.essn = emp.ssn
ORDER BY proj.pname;


-- 13. Display all the data of the department which has the smallest employee ID over all employees' ID.
SELECT dep.*
FROM department dep
JOIN employee emp ON dep.dnum = emp.dno
WHERE emp.ssn = (SELECT MIN(ssn) FROM employee);


-- 14. For each department, retrieve the department name and the maximum, minimum and average salary of its employees.
SELECT dep.dname,
       MAX(emp.salary) AS max_salary,
       MIN(emp.salary) AS min_salary,
       AVG(emp.salary) AS avg_salary
FROM department dep
JOIN employee emp ON dep.dnum = emp.dno
GROUP BY dep.dname;


-- 15. List the last name of all managers who have no dependents.
Select emp.lname
From department dep 
join employee emp
on dep.mgrssn = emp.ssn
left join dependent d
on emp.ssn = d.essn
where d.essn IS NULL;


-- 16. For each department-- if its average salary is less than the average salary of all employees-- display its number, name and number of its employees.
SELECT d.dnum, d.dname, COUNT(e.ssn) AS emp_count
FROM department d
JOIN employee e ON d.dnum = e.dno
GROUP BY d.dnum, d.dname
HAVING AVG(e.salary) < (SELECT AVG(salary) FROM employee);


-- 17. Retrieve a list of employees and the projects they are working on ordered by department and within each department, ordered alphabetically by last name, first name.
SELECT d.dname AS Department_Name,
       CONCAT(e.fname, ' ', e.lname) AS Employee_Name,
       p.pname AS Project_Name
FROM employee e
JOIN department d ON e.dno = d.dnum
JOIN works_on w ON e.ssn = w.essn
JOIN project p ON w.pno = p.pnumber
ORDER BY d.dname, e.lname, e.fname;


-- 18. For each project located in Cairo City, find the project number, the controlling department name, the department manager’s last name, address, and birthdate.
SELECT p.pnumber,
       d.dname AS Department_Name,
       mgr.lname AS Manager_LastName,
       mgr.address AS Manager_Address,
       mgr.bdate AS Manager_Birthdate
FROM project p
JOIN department d ON p.dnum = d.dnum
JOIN employee mgr ON d.mgrssn = mgr.ssn
WHERE p.plocation = 'Cairo';