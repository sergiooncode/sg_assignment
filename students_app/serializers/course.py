from rest_framework import serializers

from students_app.models import Course


class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ('course_id', 'name')
