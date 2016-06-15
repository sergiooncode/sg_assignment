from rest_framework import generics

from students_app.serializers.student_class import StudentClassSerializer
from students_app.models import StudentClass


class StudentClassList(generics.ListAPIView):
    """
    List all students.
    """
    serializer_class = StudentClassSerializer
    queryset = StudentClass.objects.all()
