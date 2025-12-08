package school;

import school.ui.ScreenHandler;
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
            ScreenHandler.printMenu();
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
                    default: System.out.println("Invalid choice. Please enter 0-5."); ScreenHandler.pressEnterToContinue(sc);
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid input, Please enter a number.");
                ScreenHandler.pressEnterToContinue(sc);
            }
        }
    }

    public void listAllCourses() {
        ScreenHandler.printHeader("Available Courses");
        if (coursesMap.isEmpty()) { System.out.println("No courses available."); }
        else {
            for (Course c : coursesMap.values()) {
                System.out.printf("ID: %-4d | Name: %s%n", c.getCourseID(), c.getCourseName());
            }
        }
        ScreenHandler.pressEnterToContinue(sc);
    }

    public void listAllStudents() {
        ScreenHandler.printHeader("Student List");
        if (studentsMap.isEmpty()) { System.out.println("No students registered."); }
        else {
            for (Student s : studentsMap.values()) {
                System.out.printf("ID: %-8d | Name: %s%n", s.getStudentID(), s.getStudentName());
            }
        }
        ScreenHandler.pressEnterToContinue(sc);
    }

    public void addNewStudent() {
        ScreenHandler.printHeader("Add New Student");

        try {
            System.out.print("Enter Student ID: ");
            int id = Integer.parseInt(sc.nextLine());

            if (studentsMap.containsKey(id)) {
                System.out.println("Error: Student with ID " + id + " already exists.");
                ScreenHandler.pressEnterToContinue(sc);
                return;
            }

            System.out.print("Enter Student Name: ");
            String name = sc.nextLine();

            studentsMap.put(id, new Student(id, name));
            System.out.println("Student " + name + " added successfully.");

        } catch (NumberFormatException e) {
            System.out.println("Error: Invalid ID format.");
        }

        ScreenHandler.pressEnterToContinue(sc);
    }

    public void registerCourseForStudent() {
        ScreenHandler.printHeader("Register Course");
        try {
            System.out.print("Enter Student ID: ");
            int sId = Integer.parseInt(sc.nextLine());

            Student student = studentsMap.get(sId);
            if (student == null) {
                System.out.println("Error: Student not found.");
                ScreenHandler.pressEnterToContinue(sc);
                return;
            }

            System.out.print("Enter Course ID: ");
            int cId = Integer.parseInt(sc.nextLine());
            Course course = coursesMap.get(cId);

            if (course == null) {
                System.out.println("Error: Course not found.");
                ScreenHandler.pressEnterToContinue(sc);
                return;
            }

            System.out.print("Enter Grade for " + course.getCourseName() + ": ");
            double grade = Double.parseDouble(sc.nextLine());

            student.registerCourse(course, grade);
            System.out.println("Success: Registered " + course.getCourseName() + " for " + student.getStudentName());

        } catch (NumberFormatException e) {
            System.out.println("Error: Invalid number input.");
        }

        ScreenHandler.pressEnterToContinue(sc);
    }

    public void printAllReports() {
        ScreenHandler.printHeader("FINAL REPORTS");
        for (Student st : studentsMap.values()) {
            st.printReport();
            ScreenHandler.printSeparator();
        }
        ScreenHandler.pressEnterToContinue(sc);
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
        if (student == null) return;
		StringTokenizer st = new StringTokenizer(data, " ");
		while(st.hasMoreTokens()){
			String token = st.nextToken();
			try {
				StringTokenizer pair = new StringTokenizer(token, ":");
                int courseId = Integer.parseInt(pair.nextToken());
                double grade = Double.parseDouble(pair.nextToken());
                if (coursesMap.containsKey(courseId)) student.registerCourse(coursesMap.get(courseId), grade);
            } catch (Exception e) {
                System.out.println("Error parsing grade data: " + token);
            }
		}
    }
}