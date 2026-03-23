from django.shortcuts import get_object_or_404, redirect, render

from .models import Feedback, Student


def home(request):
    return render(request, "library/home.html")


def students(request):
    if request.method == "POST":
        Student.objects.create(
            name=request.POST.get("name", "").strip(),
            age=request.POST.get("age") or 0,
            email=request.POST.get("email", "").strip(),
            image=request.POST.get("image", "").strip(),
        )
        return redirect("students")

    all_students = Student.objects.order_by("id")
    return render(request, "library/students.html", {"students": all_students})


def delete_student(request, student_id):
    if request.method == "POST":
        student = get_object_or_404(Student, id=student_id)
        student.delete()
    return redirect("students")


def contact_us(request):
    if request.method == "POST":
        Feedback.objects.create(
            email=request.POST.get("email", "").strip(),
            message=request.POST.get("message", "").strip(),
        )
        return redirect("contact_us")

    all_feedback = Feedback.objects.order_by("-date_added")
    return render(request, "library/contact.html", {"feedback_list": all_feedback})
