from django.db import models

# Create your models here.
class Student(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gpa = models.FloatField()
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=128)
    def __str__(self):
        return self.name

class Course(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    students = models.ManyToManyField(Student, related_name='courses')
    def __str__(self):
        return self.name

class StudentCourse(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='student_courses')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='student_courses')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['student', 'course'], name='unique_student_course'),
        ]

    def __str__(self):
        return f"{self.student.name} - {self.course.name}"


class StudentToken(models.Model):
    student = models.OneToOneField(Student, on_delete=models.CASCADE, related_name='session_token')
    token = models.CharField(max_length=512, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Token for {self.student.username}"
