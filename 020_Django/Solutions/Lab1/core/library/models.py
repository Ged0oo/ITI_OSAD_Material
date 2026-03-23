from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=120)
    age = models.PositiveIntegerField()
    email = models.EmailField(unique=True)
    image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name


class Feedback(models.Model):
    email = models.EmailField()
    message = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email} - {self.date_added:%Y-%m-%d}"
