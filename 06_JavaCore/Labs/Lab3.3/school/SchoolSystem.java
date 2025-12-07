package school;

import java.util.*;

public class SchoolSystem {
    private ArrayList<Student> students;
    private Map<Integer, Course> coursesMap;
    private Scanner sc;

    public SchoolSystem(){
        this.students = new ArrayList<>();
        this.coursesMap = new HashMap<>();
        this.sc = new Scanner(java.lang.System.in);
        initializeData();
    }

    public void start(){
        boolean running = true;
        while(running){
            printMenu();
            int choice = sc.nextInt();
            switch(choice){
                case 0: java.lang.System.out.println("Exit."); running = false; break;
                case 1: listAllCourses(); break;
                case 2: listAllStudents(); break;
                case 3: addNewStudent(); break;
                case 4: registerCourseForStudent(); break;
                case 5: printAllReports(); break;
            }
        }
    }

    public void printMenu() {
        java.lang.System.out.println("=== STUDENT REGISTRATION SYSTEM ===");
        java.lang.System.out.println("1. List Available Courses");
        java.lang.System.out.println("2. List Registered Students");
        java.lang.System.out.println("3. Add New Student");
        java.lang.System.out.println("4. Register Course for a Student");
        java.lang.System.out.println("5. Print Final Reports");
        java.lang.System.out.println("0. Exit");
        java.lang.System.out.print("Enter your choice: ");
    }

    public void listAllCourses(){
        java.lang.System.out.println("\n--- Available Courses ---");
        for (Course c : coursesMap.values()) {
            java.lang.System.out.println("ID: " + c.getCourseID() + " | Name: " + c.getCourseName());
        }
    }

    public void listAllStudents() {
        java.lang.System.out.println("\n--- Student List ---");
        for (Student s : students) {
            java.lang.System.out.println("ID: " + s.getStudentID() + " | Name: " + s.getStudentName());
        }
    }

    public void addNewStudent() {
        java.lang.System.out.println("\n--- Add New Student ---");
        java.lang.System.out.print("Enter Student ID: ");
        int id = sc.nextInt();

        sc.nextLine();
    
        java.lang.System.out.print("Enter Student Name: ");
        String name = sc.nextLine();

        students.add(new Student(id, name));
        java.lang.System.out.println("Student " + name + " added successfully.");
    }

    public void registerCourseForStudent() {
        java.lang.System.out.println("\n--- Register Course ---");
        
        java.lang.System.out.print("Enter Student ID: ");
        int sId = sc.nextInt();
        Student student = findStudentById(sId);
        
        if (student == null) {
            java.lang.System.out.println("Error: Student not found.");
            return;
        }

        java.lang.System.out.print("Enter Course ID: ");
        int cId = sc.nextInt();
        Course course = coursesMap.get(cId);

        if (course == null) {
            java.lang.System.out.println("Error: Course not found.");
            return;
        }

        java.lang.System.out.print("Enter Grade for " + course.getCourseName() + ": ");
        double grade = sc.nextDouble();
        sc.nextLine();

        student.registerCourse(course, grade);
        java.lang.System.out.println("Success Registered " + course.getCourseName() + " for " + student.getStudentName());
    }

    public void printAllReports() {
        java.lang.System.out.println("\n--- FINAL REPORTS ---");
        for (Student st : students) {
            st.printReport();
        }
    }

    public void initializeData() {
        ArrayList<Course> tempCourses = new ArrayList<>();
        tempCourses.add(new Course(1, "DataStructure", 3));
        tempCourses.add(new Course(2, "Algorithms", 3));
        tempCourses.add(new Course(3, "Database", 3));
        tempCourses.add(new Course(4, "OOP", 3));

        for (Course c : tempCourses) {
            coursesMap.put(c.getCourseID(), c);
        }

        Student s1 = new Student(20012407, "Amr");
        Student s2 = new Student(20012408, "Ehab");
        Student s3 = new Student(20012409, "Nagy");

        students.add(s1);
        students.add(s2);
        students.add(s3);
        
        processGrades(s1, "1:90 2:91 3:86 4:80");
        processGrades(s2, "1:88 2:93 3:82 4:84");
        processGrades(s3, "1:91 2:95 3:89 4:89");
    }

    public Student findStudentById(int id) {
        for (Student s : students) {
            if (s.getStudentID() == id) return s;
        }
        return null;
    }

    public void processGrades(Student student, String data) {
        String[] tokens = data.split(" "); 
        for (String token : tokens) {
            String[] parts = token.split(":"); 
            int courseId = Integer.parseInt(parts[0]);
            double grade = Double.parseDouble(parts[1]);
            
            if (coursesMap.containsKey(courseId)) {
                student.registerCourse(coursesMap.get(courseId), grade);
            }
        }
    }
}