from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Student, Course, StudentCourse, SchoolClass


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True, 'required': True, 'allow_blank': False},
            'username': {'required': True},
            'name': {'required': True, 'allow_blank': False},
            'age': {'required': True},
            'gpa': {'required': True},
            'email': {'required': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        if password:
            validated_data['password'] = make_password(password)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            validated_data['password'] = make_password(password)
        return super().update(instance, validated_data)


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        extra_kwargs = {
            'students': {'required': False},
        }


class StudentCourseSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)
    student_name = serializers.CharField(source='student.name', read_only=True)

    class Meta:
        model = StudentCourse
        fields = ['id', 'student', 'student_name', 'course', 'course_name']


class SchoolClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolClass
        fields = '__all__'


class RegisterStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['name', 'age', 'gpa', 'username', 'password', 'email']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True, 'allow_blank': False},
            'name': {'required': True, 'allow_blank': False},
            'age': {'required': True},
            'gpa': {'required': True},
            'username': {'required': True, 'allow_blank': False},
            'email': {'required': True},
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return Student.objects.create(**validated_data)