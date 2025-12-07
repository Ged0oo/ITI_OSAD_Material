package school;

import java.util.*;
import java.io.*;


public class Student {
    private int studentID;
    private String studentName;
    private ArrayList<RegisterCourse> courses;

    public Student(int sID, String sName){
        this.studentID = sID;
        this.studentName = sName;
        courses = new ArrayList<RegisterCourse>();
    }

    public int getStudentID(){return studentID;}
    public String getStudentName(){return studentName;}
    public ArrayList<RegisterCourse> getRegistrations(){return courses;}

    public void printReport(){
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

    public void registerCourse(Course course, Double grade){
        courses.add(new RegisterCourse(course, grade));
    }

    public class RegisterCourse{
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
