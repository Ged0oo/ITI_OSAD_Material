from django.urls import include, path
from rest_framework.routers import DefaultRouter


from .views import (
    StudentListCreateView,
    StudentDetailView,
    course_list,
    course_detail,
    signup,
    login,
    logout,
)


router = DefaultRouter()


urlpatterns = [
    path('signup', signup, name='api_auth_register'),
    path('login', login, name='api_auth_login'),
    path('logout', logout, name='api_auth_logout'),
    path('students', StudentListCreateView.as_view(), name='api_students_list_create'),
    path('students/<int:id>', StudentDetailView.as_view(), name='api_students_detail'),
    path('courses', course_list, name='api_courses_list_create'),
    path('courses/<int:id>', course_detail, name='api_courses_detail'),
    path('', include(router.urls)),
]