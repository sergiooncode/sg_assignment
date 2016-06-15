from django.conf.urls import url

from students_app.views import students, courses, student_classes


urlpatterns = [
    url(r'^courses/$', courses.CourseList.as_view(), name='courses'),
    url(r'^student_classes/$', student_classes.StudentClassList.as_view(), name='student_classes'),
    url(r'^students/search/$', students.students_search, name='students_search'),
    url(r'^student/(?P<first_name>.+)/(?P<last_name>.+)/$', students.StudentDetail.as_view(), name='student_details'),
]
