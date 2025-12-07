import java.util.*;
import java.io.*;


public class Student {
    private int studentID;
    private String studentName;
    private ArrayList<RegisterCourse> courses;

    Student(int sID, String sName){
        this.studentID = sID;
        this.studentName = sName;
        courses = new ArrayList<RegisterCourse>();
    }

    int getStudentID(){return studentID;}
    String getStudentName(){return studentName;}
    ArrayList<RegisterCourse> getRegistrations(){return courses;}

    void printReport(){
        StringBuilder sb = new StringBuilder();
        sb.append("Student Name: ")
          .append(studentName)
          .append("\tStudent ID: ")
          .append(studentID)
          .append('\n');

        for(RegisterCourse c:courses){
            sb.append("Course: ")
              .append(c.getCourse().getCourseName())
              .append("\tCourse Grade: ")
              .append(c.getGrade())
              .append('\n');
        }

        java.lang.System.out.println(sb);
    }

    void registerCourse(Course course, Double grade){
        courses.add(new RegisterCourse(course, grade));
    }

    private class RegisterCourse{
        private Course course;
        private Double grade;

        Course getCourse(){return course;}
        Double getGrade(){return grade;}

        RegisterCourse(Course course, Double grade){
            this.course = course;
            this.grade = grade;
        }
    }
}
