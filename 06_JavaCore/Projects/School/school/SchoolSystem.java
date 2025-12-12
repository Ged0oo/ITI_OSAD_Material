package school;

import school.ui.ScreenHandler;
import java.util.*;

public class SchoolSystem {
    public Map<Integer, Student> studentsMap = new LinkedHashMap<>();
    public Map<Integer, Course> coursesMap = new HashMap<>();
    public Scanner sc = new Scanner(System.in);

    public void start() {
        boolean running = true;
        while (running) {
            ScreenHandler.printMenu();
            String input = sc.nextLine();
            int choice = -1;
            try { choice = Integer.parseInt(input); } catch (NumberFormatException ignored) {}
            switch (choice) {
                case 0 -> { System.out.println("Exiting System."); running = false; }
                case 1 -> listAllCourses();
                case 2 -> listAllStudents();
                case 3 -> addNewCourse();
                case 4 -> addNewStudent();
                case 5 -> registerCourseForStudent();
                case 6 -> printAllReports();
                case 7 -> printStudentReport();
                default -> { System.out.println("Invalid choice."); ScreenHandler.pressEnterToContinue(sc); }
            }
        }
    }

    public void listAllCourses() {
        ScreenHandler.printHeader("Available Courses");
        if (coursesMap.isEmpty()) System.out.println("No courses available.");
        else coursesMap.values().forEach(c -> System.out.printf("ID: %-4d | Name: %s%n", c.getCourseID(), c.getCourseName()));
        ScreenHandler.pressEnterToContinue(sc);
    }

    public void listAllStudents() {
        ScreenHandler.printHeader("Student List");
        if (studentsMap.isEmpty()) System.out.println("No students registered.");
        else studentsMap.values().forEach(s -> System.out.printf("ID: %-8d | Name: %s%n", s.getStudentID(), s.getStudentName()));
        ScreenHandler.pressEnterToContinue(sc);
    }

    public void addNewCourse() {
        ScreenHandler.printHeader("Add New Course");
        int id = readInt("Enter Course ID: ");

        if (coursesMap.containsKey(id)) {
            System.out.println("Course exists.");
            ScreenHandler.pressEnterToContinue(sc);
            return;
        }

        String name = readName("Enter Course Name: ");
        int credits = readInt("Enter Course Credits: ");

        coursesMap.put(id, new Course(id, name, credits));
        System.out.println("Course added successfully.");
        ScreenHandler.pressEnterToContinue(sc);
    }

    public void addNewStudent() {
        ScreenHandler.printHeader("Add New Student");
        int id = read8DigitID("Enter Student ID: ");

        if (studentsMap.containsKey(id)) {
            System.out.println("Student exists.");
            ScreenHandler.pressEnterToContinue(sc);
            return;
        }

        String name = readName("Enter Student Name: ");
        studentsMap.put(id, new Student(id, name));
        System.out.println("Student added successfully.");
        ScreenHandler.pressEnterToContinue(sc);
    }

    public void registerCourseForStudent() {
        ScreenHandler.printHeader("Register Course");
        int sId = read8DigitID("Enter Student ID: ");
        Student student = studentsMap.get(sId);

        if (student == null) {
            System.out.println("Student not found.");
            ScreenHandler.pressEnterToContinue(sc);
            return;
        }

        int cId = readInt("Enter Course ID: ");
        Course course = coursesMap.get(cId);
        if (course == null) {
            System.out.println("Course not found.");
            ScreenHandler.pressEnterToContinue(sc);
            return;
        }

        double grade = readDouble("Enter Grade for " + course.getCourseName() + ": ");
        student.registerCourse(course, grade);
        System.out.println("Registered successfully.");
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

    public void printStudentReport() {
        ScreenHandler.printHeader("FINAL STUDENT REPORT");
        int sId = read8DigitID("Enter Student ID: ");
        Student s = studentsMap.get(sId);
        if (s == null) System.out.println("Student not found.");
        else s.printReport();
        ScreenHandler.pressEnterToContinue(sc);
    }

    public int readInt(String prompt) {
        while (true) {
            System.out.print(prompt);
            try { return Integer.parseInt(sc.nextLine()); }
            catch (NumberFormatException e) { System.out.println("Invalid number."); }
        }
    }

    public double readDouble(String prompt) {
        while (true) {
            System.out.print(prompt);
            try { return Double.parseDouble(sc.nextLine()); }
            catch (NumberFormatException e) { System.out.println("Invalid number."); }
        }
    }

    public int read8DigitID(String prompt) {
        while (true) {
            int id = readInt(prompt);
            if (id >= 10000000 && id <= 99999999) return id;
            System.out.println("ID must be 8 digits.");
        }
    }

    public String readName(String prompt) {
        while (true) {
            System.out.print(prompt);
            String name = sc.nextLine();
            if (name.matches("[a-zA-Z ]+"))  return name;

            System.out.println("Name must contain only letters.");
        }
    }

    public void addCourse(int id, String name, int credits) {
        coursesMap.put(id, new Course(id, name, credits));
    }

    public void addStudent(int id, String name) {
        studentsMap.put(id, new Student(id, name));
    }
}