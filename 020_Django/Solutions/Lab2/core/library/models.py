from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=120)
    age = models.PositiveIntegerField()
    email = models.EmailField(unique=True)
    image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name


class Subject(models.Model):
    name = models.CharField(max_length=120, unique=True)
    code = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return f"{self.code} - {self.name}"


class Grade(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="grades")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="grades")
    score = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(100)])

    class Meta:
        unique_together = ("student", "subject")

    def __str__(self):
        return f"{self.student.name} - {self.subject.code}: {self.score}"


class Feedback(models.Model):
    email = models.EmailField()
    message = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email} - {self.date_added:%Y-%m-%d}"
