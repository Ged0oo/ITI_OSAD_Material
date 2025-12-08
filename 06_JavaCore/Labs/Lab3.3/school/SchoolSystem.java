package school;

import java.util.*;

public class SchoolSystem {
    private Map<Integer, Student> studentsMap;
    private Map<Integer, Course> coursesMap;
    private Scanner sc;

    public SchoolSystem() {
        this.studentsMap = new LinkedHashMap<>();
        this.coursesMap = new HashMap<>();
        this.sc = new Scanner(System.in);
        InitializeData();
    }

    public void start() {
        boolean running = true;
        while (running) {
            printMenu();
            try {
                String input = sc.nextLine();
                int choice = Integer.parseInt(input);
                switch (choice) {
                    case 0: System.out.println("Exiting System."); running = false; break;
                    case 1: listAllCourses(); break;
                    case 2: listAllStudents(); break;
                    case 3: addNewStudent(); break;
                    case 4: registerCourseForStudent(); break;
                    case 5: printAllReports(); break;
                    default: System.out.println("Invalid choice. Please enter 0-5."); HandleReturn();
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid input, Please enter a number.");
                HandleReturn();
            }
        }
    }

    public void printMenu() {
        clearScreen();
        System.out.println("\n===========================================");
        System.out.println("======= STUDENT REGISTRATION SYSTEM =======");
        System.out.println("1. List Available Courses");
        System.out.println("2. List Registered Students");
        System.out.println("3. Add New Student");
        System.out.println("4. Register Course for a Student");
        System.out.println("5. Print Final Reports");
        System.out.println("0. Exit");
        System.out.print("Enter your choice: ");
    }

    public void listAllCourses() {
        clearScreen();
        System.out.println("\n-------- Available Courses --------");
        if (coursesMap.isEmpty()) { System.out.println("No courses available."); }
        else {
            for (Course c : coursesMap.values()) {
                System.out.printf("ID: %-4d | Name: %s%n", c.getCourseID(), c.getCourseName());
            }
        }
        HandleReturn();
    }

    public void listAllStudents() {
        clearScreen();
        System.out.println("\n-------- Student List --------");
        if (studentsMap.isEmpty()) { System.out.println("No students registered."); } 
        else {
            for (Student s : studentsMap.values()) {
                System.out.printf("ID: %-8d | Name: %s%n", s.getStudentID(), s.getStudentName());
            }
        }
        HandleReturn();
    }

    public void addNewStudent() {
        clearScreen();
        System.out.println("\n-------- Add New Student --------");

        try {
            System.out.print("Enter Student ID: ");
            int id = Integer.parseInt(sc.nextLine());

            if (studentsMap.containsKey(id)) {
                System.out.println("Error: Student with ID " + id + " already exists.");
                HandleReturn();
                return;
            }

            System.out.print("Enter Student Name: ");
            String name = sc.nextLine();

            studentsMap.put(id, new Student(id, name));
            System.out.println("Student " + name + " added successfully.");

        } catch (NumberFormatException e) {
            System.out.println("Error: Invalid ID format.");
        }

        HandleReturn();
    }

    public void registerCourseForStudent() {
        clearScreen();
        System.out.println("\n-------- Register Course --------");
        try {
            System.out.print("Enter Student ID: ");
            int sId = Integer.parseInt(sc.nextLine());
            
            Student student = studentsMap.get(sId);
            if (student == null) {
                System.out.println("Error: Student not found.");
                HandleReturn();
                return;
            }

            System.out.print("Enter Course ID: ");
            int cId = Integer.parseInt(sc.nextLine());
            Course course = coursesMap.get(cId);

            if (course == null) {
                System.out.println("Error: Course not found.");
                HandleReturn();
                return;
            }

            System.out.print("Enter Grade for " + course.getCourseName() + ": ");
            double grade = Double.parseDouble(sc.nextLine());

            student.registerCourse(course, grade);
            System.out.println("Success: Registered " + course.getCourseName() + " for " + student.getStudentName());

        } catch (NumberFormatException e) {
            System.out.println("Error: Invalid number input.");
        }

        HandleReturn();
    }

    public void printAllReports() {
        clearScreen();
        System.out.println("\n-------- FINAL REPORTS --------");
        for (Student st : studentsMap.values()) {
            st.printReport();
            System.out.println("-------------------------------"); // improved separation
        }
        HandleReturn();
    }

    public void HandleReturn() {
        System.out.println("\nPress ENTER to return to Main Menu...");
        sc.nextLine();
    }

    public void InitializeData() {
        addCourse(1, "Data Structure", 3);
        addCourse(2, "Algorithms", 3);
        addCourse(3, "Data Base", 3);
        addCourse(4, "System Design", 3);

        addStudent(20012407, "Amr");
        addStudent(20012408, "Ehab");
        addStudent(20012409, "Nagy");

        processGrades(studentsMap.get(20012407), "1:90 2:91 3:86 4:80");
        processGrades(studentsMap.get(20012408), "1:88 2:93 3:82 4:84");
        processGrades(studentsMap.get(20012409), "1:91 2:95 3:89 4:89");
    }

    private void addCourse(int id, String name, int credits) {
        coursesMap.put(id, new Course(id, name, credits));
    }

    private void addStudent(int id, String name) {
        studentsMap.put(id, new Student(id, name));
    }

    public void processGrades(Student student, String data) {
        // "1:90 2:91 3:86 4:80"
        if (student == null) return;
        String[] tokens = data.split(" ");
        for (String token : tokens) {
            try {
                String[] parts = token.split(":");
                int courseId = Integer.parseInt(parts[0]);
                double grade = Double.parseDouble(parts[1]);
                if (coursesMap.containsKey(courseId)) student.registerCourse(coursesMap.get(courseId), grade);
            } catch (Exception e) {
                System.out.println("Error parsing grade data: " + token);
            }
        }
    }

    public static void clearScreen() {
        for (int i = 0; i < 50; i++) System.out.println();
    }
}