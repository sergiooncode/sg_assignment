from django.db import models


class StudentClass(models.Model):
    student = models.ForeignKey('Student', null=False)
    course = models.ForeignKey('Course', null=False)
    grade = models.DecimalField(max_digits=2, decimal_places=1)
