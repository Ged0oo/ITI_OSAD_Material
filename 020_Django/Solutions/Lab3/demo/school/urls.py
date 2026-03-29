from django.urls import path
from .views import student_list, student_detail, courses_list, courses_for_logged_in_user, signup, login, logout

urlpatterns = [
    path('signup', signup),
    path('signup/', signup),

    path('login', login),
    path('login/', login),

    path('logout', logout),
    path('logout/', logout),
    
    path('courses', courses_for_logged_in_user),
    path('courses/', courses_for_logged_in_user),
    
    path('students', student_list),
    path('students/', student_list),
    
    path('students/<int:id>', student_detail),
    path('students/<int:id>/', student_detail),
    
    path('students/<int:id>/courses', courses_list),
    path('students/<int:id>/courses/', courses_list),
]