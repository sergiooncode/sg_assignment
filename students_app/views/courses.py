from rest_framework import generics

from students_app.serializers.course import CourseSerializer
from students_app.models import Course


class CourseList(generics.ListAPIView):
    """
    List all students.
    """
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
