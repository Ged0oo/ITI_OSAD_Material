public class Course {
    private int courseID;
    private String courseName;
    private int credHours;

    void setCourseID(int id){this.courseID = id;}
    void setCourseName(String course){this.courseName = course;}
    void setCredHours(int credH){this.credHours = credH;}

    int getCourseID(){return courseID;}
    String getCourseName(){return courseName;}
    int getCredHoures(){return credHours;}

    Course(int cId, String cName, int cHoures){
        this.courseID = cId;
        this.courseName = cName;
        this.credHours = cHoures;
    }
}