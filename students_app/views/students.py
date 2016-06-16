from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from students_app.serializers.student import StudentSerializer, StudentDetailSerializer
from students_app.models import Student, StudentClass
from students_app.utils import normalize_name_for_db


@api_view(['GET'])
def students_search(request):
    students = None
    if request.method == 'GET':
        all_students = Student.objects.all()
        first_name = request.query_params.get('first_name', None)
        last_name = request.query_params.get('last_name', None)
        first_name = normalize_name_for_db(first_name)
        last_name = normalize_name_for_db(last_name)
        if first_name is not None and last_name is not None:
            students = all_students.filter(
                first_name=first_name,
                last_name=last_name
            )
        if first_name is not None:
            students = all_students.filter(first_name=first_name)
        if last_name is not None:
            students = all_students.filter(last_name=last_name)
    serializer = StudentSerializer(students, many=True)
    sd = []
    for d in serializer.data:
        student_dict = {}
        student_dict['student'] = d
        sd.append(student_dict)
    return Response(sd)


class StudentDetail(generics.ListAPIView):
    serializer_class = StudentDetailSerializer

    def get_queryset(self):
        queryset = StudentClass.objects.select_related('course', 'student').all()
        first_name = self.kwargs['first_name']
        last_name = self.kwargs['last_name']

        return queryset.filter(
            student__first_name=normalize_name_for_db(first_name),
            student__last_name=normalize_name_for_db(last_name)
        )
