# Generated by Django 4.1.7 on 2023-03-13 03:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_newuser_rollno'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newuser',
            name='rollNo',
            field=models.CharField(max_length=150, unique=True),
        ),
    ]
