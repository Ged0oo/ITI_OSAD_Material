import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        ArrayList<Student> students = new ArrayList<Student>();
        ArrayList<Course> myCourses = new ArrayList<Course>();

        myCourses.add(new Course(1, "DataStructure", 3));
        myCourses.add(new Course(2, "Algorithms", 3));
        myCourses.add(new Course(3, "Database", 3));
        myCourses.add(new Course(4, "SystemDesign", 3));

        Map<Integer, Course> courseMap = new HashMap<>();
        for (Course c : myCourses) courseMap.put(c.getCourseID(), c);

        Student s1 = new Student(20012407, "Amr");
        Student s2 = new Student(20012408, "Ehab");
        Student s3 = new Student(20012409, "Nagy");

        students.add(s1);
        students.add(s2);
        students.add(s3);

        String cid_grade_s1 = "1:90 2:91 3:86 4:80";
        String cid_grade_s2 = "1:88 2:93 3:82 4:84";
        String cid_grade_s3 = "1:91 2:95 3:89 4:89";

        processGrades(s1, cid_grade_s1, courseMap);
        processGrades(s2, cid_grade_s2, courseMap);
        processGrades(s3, cid_grade_s3, courseMap);

        for (Student st : students) st.printReport();
    }

    public static void processGrades(Student student, String data, Map<Integer, Course> map) {
        String[] tokens = data.split(" "); 
        for (String token : tokens) {
            String[] parts = token.split(":"); 
            int courseId = Integer.parseInt(parts[0]);
            double grade = Double.parseDouble(parts[1]);
            Course c = map.get(courseId); 
            if (c != null) student.registerCourse(c, grade);
        }
    }
}