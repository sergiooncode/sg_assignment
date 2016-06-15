env:
	python -m venv env

deps:
	env/bin/pip install -Ur requirements.txt

start:
	env/bin/python manage.py runserver

db:
		dropdb --if-exists sg && createdb sg && env/bin/python manage.py migrate && env/bin/python manage.py loaddata students_app/fixtures/course_seed.json && env/bin/python manage.py loaddata students_app/fixtures/student_seed.json && env/bin/python manage.py loaddata students_app/fixtures/studentclass_seed.json 
		echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com', 'admin')" | env/bin/python manage.py shell
