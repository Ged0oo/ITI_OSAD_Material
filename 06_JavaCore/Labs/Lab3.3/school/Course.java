package school;

public class Course {
    private int courseID;
    private String courseName;
    private int credHours;

    void setCourseID(int id){this.courseID = id;}
    void setCourseName(String course){this.courseName = course;}
    void setCredHours(int credH){this.credHours = credH;}

    public int getCourseID(){return courseID;}
    public String getCourseName(){return courseName;}
    public int getCredHoures(){return credHours;}

    public Course(int cId, String cName, int cHoures){
        this.courseID = cId;
        this.courseName = cName;
        this.credHours = cHoures;
    }
}