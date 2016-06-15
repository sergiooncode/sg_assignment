from rest_framework import serializers

from students_app.models import StudentClass


class StudentClassSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentClass
        fields = ('student', 'course', 'grade')
