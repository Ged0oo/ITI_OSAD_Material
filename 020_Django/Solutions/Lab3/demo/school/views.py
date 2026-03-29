from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from django.core import signing
from .models import Student, Course, StudentCourse, SchoolClass, StudentToken
from .serializer import StudentSerializer, CourseSerializer, StudentCourseSerializer, SchoolClassSerializer, RegisterStudentSerializer


def get_token(request):
    auth_header = request.headers.get('Authorization', '').strip()
    if not auth_header:
        return None
    if auth_header.lower().startswith('bearer '):
        return auth_header[7:].strip()
    return auth_header


def student_from_token(request):
    token = get_token(request)
    if not token:
        return None, Response({'error': 'Authorization header is required'}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        payload = signing.loads(token)
    except signing.BadSignature:
        return None, Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

    token_row = StudentToken.objects.filter(token=token).select_related('student').first()
    if not token_row:
        return None, Response({'error': 'Token is not active'}, status=status.HTTP_401_UNAUTHORIZED)

    student_id = payload.get('student_id') or payload.get('user_id')
    if token_row.student_id != student_id:
        return None, Response({'error': 'Invalid token student'}, status=status.HTTP_401_UNAUTHORIZED)

    if not token_row.student:
        return None, Response({'error': 'Invalid token student'}, status=status.HTTP_401_UNAUTHORIZED)

    return token_row.student, None


def enroll_student_course(student, payload):
    course_id = payload.get('course_id')

    if course_id:
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return None, Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        serializer = CourseSerializer(data=payload)
        if not serializer.is_valid():
            return None, Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        course = serializer.save()

    student_course, created = StudentCourse.objects.get_or_create(
        student=student,
        course=course,
    )

    # Keep both relationship paths in sync while both models are present.
    course.students.add(student)

    return student_course, None


@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        serializer = RegisterStudentSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = Student.objects.get(username=username)
        except Student.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        if check_password(password, user.password or ''):
            token = signing.dumps({'student_id': user.id, 'username': user.username})
            StudentToken.objects.update_or_create(
                student=user,
                defaults={'token': token},
            )
            
            return Response({
                'message': 'Login successful',
                'token': token,
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout(request):
    token = get_token(request)
    if not token:
        return Response({'error': 'Authorization header is required'}, status=status.HTTP_401_UNAUTHORIZED)

    deleted_count, _ = StudentToken.objects.filter(token=token).delete()
    if deleted_count == 0:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def student_list(request):
    if request.method == 'GET':
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            if Student.objects.filter(email=serializer.validated_data['email']).exists():
                return Response({'error': 'Student with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def courses_list(request, id):
    try:
        student = Student.objects.get(id=id)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        student_courses = StudentCourse.objects.filter(student=student).select_related('course', 'student')
        serializer = StudentCourseSerializer(student_courses, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        student_course, error_response = enroll_student_course(student, request.data)
        if error_response:
            return error_response
        serializer = StudentCourseSerializer(student_course)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
def courses_for_logged_in_user(request):
    student, error_response = student_from_token(request)
    if error_response:
        return error_response

    if request.method == 'GET':
        student_courses = StudentCourse.objects.filter(student=student).select_related('course', 'student')
        serializer = StudentCourseSerializer(student_courses, many=True)
        return Response(serializer.data)

    student_course, error_response = enroll_student_course(student, request.data)
    if error_response:
        return error_response

    serializer = StudentCourseSerializer(student_course)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def student_detail(request, id):
    try:
        student = Student.objects.get(id=id)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = StudentSerializer(student)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
