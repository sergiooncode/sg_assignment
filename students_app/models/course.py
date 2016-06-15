from django.db import models

# Create your models here.


class Course(models.Model):
    course_id = models.IntegerField(primary_key=True, null=False)
    name = models.CharField(max_length=30)
