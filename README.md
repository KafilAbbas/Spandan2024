Steps for using:

1)
use requirements.txt to get all dependencies installed

2)
Create a database in mySQL
Create a user with a password in mySQL
Grant all the privilieges to that user for that database


3)
Update the settings.py using this user, passsword, database_name
run python3 manage.py migrate
run python3 teams.py
run python3 dump_users.py
