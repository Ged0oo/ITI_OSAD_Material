package school;

import school.ui.ScreenHandler;
import java.util.*;

public class SchoolSystem {
    private Map<Integer, Student> studentsMap = new LinkedHashMap<>();
    private Map<Integer, Course> coursesMap = new HashMap<>();
    private Scanner sc = new Scanner(System.in);

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

    private void listAllCourses() {
        ScreenHandler.printHeader("Available Courses");
        if (coursesMap.isEmpty()) System.out.println("No courses available.");
        else coursesMap.values().forEach(c -> System.out.printf("ID: %-4d | Name: %s%n", c.getCourseID(), c.getCourseName()));
        ScreenHandler.pressEnterToContinue(sc);
    }

    private void listAllStudents() {
        ScreenHandler.printHeader("Student List");
        if (studentsMap.isEmpty()) System.out.println("No students registered.");
        else studentsMap.values().forEach(s -> System.out.printf("ID: %-8d | Name: %s%n", s.getStudentID(), s.getStudentName()));
        ScreenHandler.pressEnterToContinue(sc);
    }

    private void addNewCourse() {
        ScreenHandler.printHeader("Add New Course");
        int id = readInt("Enter Course ID: ");
        if (coursesMap.containsKey(id)) { System.out.println("Course exists."); ScreenHandler.pressEnterToContinue(sc); return; }

        String name = readName("Enter Course Name: ");
        int credits = readInt("Enter Course Credits: ");
        coursesMap.put(id, new Course(id, name, credits));
        System.out.println("Course added successfully.");
        ScreenHandler.pressEnterToContinue(sc);
    }

    private void addNewStudent() {
        ScreenHandler.printHeader("Add New Student");
        int id = read8DigitID("Enter Student ID: ");
        if (studentsMap.containsKey(id)) { System.out.println("Student exists."); ScreenHandler.pressEnterToContinue(sc); return; }

        String name = readName("Enter Student Name: ");
        studentsMap.put(id, new Student(id, name));
        System.out.println("Student added successfully.");
        ScreenHandler.pressEnterToContinue(sc);
    }

    private void registerCourseForStudent() {
        ScreenHandler.printHeader("Register Course");
        int sId = read8DigitID("Enter Student ID: ");
        Student student = studentsMap.get(sId);
        if (student == null) { System.out.println("Student not found."); ScreenHandler.pressEnterToContinue(sc); return; }

        int cId = readInt("Enter Course ID: ");
        Course course = coursesMap.get(cId);
        if (course == null) { System.out.println("Course not found."); ScreenHandler.pressEnterToContinue(sc); return; }

        double grade = readDouble("Enter Grade for " + course.getCourseName() + ": ");
        student.registerCourse(course, grade);
        System.out.println("Registered successfully.");
        ScreenHandler.pressEnterToContinue(sc);
    }

    private void printAllReports() {
        ScreenHandler.printHeader("FINAL REPORTS");
        studentsMap.values().forEach(s -> { s.printReport(); ScreenHandler.printSeparator(); });
        ScreenHandler.pressEnterToContinue(sc);
    }

    private void printStudentReport() {
        ScreenHandler.printHeader("FINAL STUDENT REPORT");
        int sId = read8DigitID("Enter Student ID: ");
        Student s = studentsMap.get(sId);
        if (s == null) System.out.println("Student not found.");
        else s.printReport();
        ScreenHandler.pressEnterToContinue(sc);
    }

    private int readInt(String prompt) {
        while (true) {
            System.out.print(prompt);
            try { return Integer.parseInt(sc.nextLine()); }
            catch (NumberFormatException e) { System.out.println("Invalid number."); }
        }
    }

    private double readDouble(String prompt) {
        while (true) {
            System.out.print(prompt);
            try { return Double.parseDouble(sc.nextLine()); }
            catch (NumberFormatException e) { System.out.println("Invalid number."); }
        }
    }

    private int read8DigitID(String prompt) {
        while (true) {
            int id = readInt(prompt);
            if (id >= 10000000 && id <= 99999999) return id;
            System.out.println("ID must be 8 digits.");
        }
    }

    private String readName(String prompt) {
        while (true) {
            System.out.print(prompt);
            String name = sc.nextLine();
            if (name.matches("[a-zA-Z ]+")) return name;
            System.out.println("Name must contain only letters.");
        }
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

    public void processGrades(Student student, String data) {
        if (student == null) return;
        StringTokenizer st = new StringTokenizer(data, " ");
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                StringTokenizer pair = new StringTokenizer(token, ":");
                int courseId = Integer.parseInt(pair.nextToken());
                double grade = Double.parseDouble(pair.nextToken());
                if (coursesMap.containsKey(courseId)) student.registerCourse(coursesMap.get(courseId), grade);
            } catch (Exception e) { System.out.println("Error parsing: " + token); }
        }
    }

    private void addCourse(int id, String name, int credits) { coursesMap.put(id, new Course(id, name, credits)); }
    private void addStudent(int id, String name) { studentsMap.put(id, new Student(id, name)); }
}