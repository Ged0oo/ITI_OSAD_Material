from django.urls import path

from .views import (
    StudentListCreateView,
    StudentDetailView,
    StudentCourseViewSet,
    course_list,
    course_detail,
    signup,
    login,
    logout,
)


student_course_list_create = StudentCourseViewSet.as_view({
    'get': 'list',
    'post': 'create',
})

student_course_detail = StudentCourseViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})

student_course_by_student = StudentCourseViewSet.as_view({
    'get': 'list_by_student',
    'post': 'create_for_student',
})

student_course_logged_in = StudentCourseViewSet.as_view({
    'get': 'list_for_logged_in_student',
    'post': 'create_for_logged_in_student',
})

urlpatterns = [
    path('signup', signup),
    path('signup/', signup),

    path('login', login),
    path('login/', login),

    path('logout', logout),
    path('logout/', logout),

    path('students', StudentListCreateView.as_view()),
    path('students/', StudentListCreateView.as_view()),

    path('students/<int:id>', StudentDetailView.as_view()),
    path('students/<int:id>/', StudentDetailView.as_view()),

    path('courses', course_list),
    path('courses/', course_list),

    path('courses/<int:id>', course_detail),
    path('courses/<int:id>/', course_detail),

    path('student-courses', student_course_list_create),
    path('student-courses/', student_course_list_create),

    path('student-courses/<int:pk>', student_course_detail),
    path('student-courses/<int:pk>/', student_course_detail),

    path('students/<int:id>/courses', student_course_by_student),
    path('students/<int:id>/courses/', student_course_by_student),

    path('my-courses', student_course_logged_in),
    path('my-courses/', student_course_logged_in),
]