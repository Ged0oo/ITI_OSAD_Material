from django.contrib.auth import logout as auth_logout
from django.contrib.auth import login as auth_login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.db.models import Q, Sum
from django.shortcuts import get_object_or_404, redirect, render

from .models import Feedback, Grade, Student, Subject


def signup(request):
    if request.user.is_authenticated:
        return redirect("home")

    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect("home")
    else:
        form = UserCreationForm()

    return render(request, "library/signup.html", {"form": form})


@login_required(login_url="login")
def home(request):
    leaderboard = (
        Student.objects.annotate(total=Sum("grades__score"))
        .filter(total__isnull=False)
        .order_by("-total", "name")[:5]
    )
    return render(request, "library/home.html", {"leaderboard": leaderboard})


def contact(request):
    return render(request, "library/contact.html")


def subjects(request):
    query = request.GET.get("q", "").strip()
    edit_id = request.GET.get("edit")

    if request.method == "POST":
        action = request.POST.get("action")

        if action == "create":
            Subject.objects.create(
                name=request.POST.get("name", "").strip(),
                code=request.POST.get("code", "").strip(),
            )
        elif action == "update":
            subject = get_object_or_404(Subject, id=request.POST.get("subject_id"))
            subject.name = request.POST.get("name", "").strip()
            subject.code = request.POST.get("code", "").strip()
            subject.save()
        elif action == "delete":
            subject = get_object_or_404(Subject, id=request.POST.get("subject_id"))
            subject.delete()

        return redirect("subjects")

    subjects_qs = Subject.objects.order_by("name")
    if query:
        subjects_qs = subjects_qs.filter(Q(name__icontains=query) | Q(code__icontains=query))

    editing_subject = None
    if edit_id:
        editing_subject = get_object_or_404(Subject, id=edit_id)

    return render(
        request,
        "library/subjects.html",
        {
            "subjects": subjects_qs,
            "query": query,
            "editing_subject": editing_subject,
        },
    )


def grade(request):
    query = request.GET.get("q", "").strip()
    edit_id = request.GET.get("edit")

    if request.method == "POST":
        action = request.POST.get("action")

        if action == "create":
            Grade.objects.create(
                student_id=request.POST.get("student_id"),
                subject_id=request.POST.get("subject_id"),
                score=request.POST.get("score") or 0,
            )
        elif action == "update":
            grade_item = get_object_or_404(Grade, id=request.POST.get("grade_id"))
            grade_item.student_id = request.POST.get("student_id")
            grade_item.subject_id = request.POST.get("subject_id")
            grade_item.score = request.POST.get("score") or 0
            grade_item.save()
        elif action == "delete":
            grade_item = get_object_or_404(Grade, id=request.POST.get("grade_id"))
            grade_item.delete()

        return redirect("grade")

    grades_qs = Grade.objects.select_related("student", "subject").order_by("id")
    if query:
        search_filter = (
            Q(student__name__icontains=query)
            | Q(subject__name__icontains=query)
            | Q(subject__code__icontains=query)
        )
        if query.isdigit():
            search_filter = search_filter | Q(student__id=int(query))
        grades_qs = grades_qs.filter(search_filter)

    editing_grade = None
    if edit_id:
        editing_grade = get_object_or_404(Grade, id=edit_id)

    return render(
        request,
        "library/grade.html",
        {
            "grades": grades_qs,
            "students": Student.objects.order_by("name"),
            "subjects": Subject.objects.order_by("name"),
            "query": query,
            "editing_grade": editing_grade,
        },
    )


def userprofile(request):
    return render(request, "library/userprofile.html")


def logout(request):
    auth_logout(request)
    return redirect("login")


def students(request):
    edit_id = request.GET.get("edit")

    if request.method == "POST":
        action = request.POST.get("action")

        if action == "create":
            Student.objects.create(
                name=request.POST.get("name", "").strip(),
                age=request.POST.get("age") or 0,
                email=request.POST.get("email", "").strip(),
                image=request.POST.get("image", "").strip(),
            )
        elif action == "update":
            student = get_object_or_404(Student, id=request.POST.get("student_id"))
            student.name = request.POST.get("name", "").strip()
            student.age = request.POST.get("age") or 0
            student.email = request.POST.get("email", "").strip()
            student.image = request.POST.get("image", "").strip()
            student.save()
        elif action == "delete":
            student = get_object_or_404(Student, id=request.POST.get("student_id"))
            student.delete()

        return redirect("students")

    editing_student = None
    if edit_id:
        editing_student = get_object_or_404(Student, id=edit_id)

    all_students = Student.objects.order_by("id")
    return render(
        request,
        "library/students.html",
        {"students": all_students, "editing_student": editing_student},
    )


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
        return redirect("contact")

    all_feedback = Feedback.objects.order_by("-date_added")
    return render(request, "library/contact.html", {"feedback_list": all_feedback})
