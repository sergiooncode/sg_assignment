from rest_framework import serializers

from students_app.models import Student, StudentClass, Course


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ('first_name', 'last_name', 'email')


class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ('course_id', 'name')


class StudentDetailSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    student = StudentSerializer(read_only=True)

    class Meta:
        model = StudentClass
        fields = ('grade', 'student', 'course')
