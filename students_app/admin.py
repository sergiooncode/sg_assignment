from django.contrib import admin

from students_app.models import Course, Student, StudentClass

# Register your models here.


admin.site.register(Course)
admin.site.register(Student)
admin.site.register(StudentClass)
