# Generated by Django 3.2.4 on 2021-08-11 23:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='lotAreaUnit',
            field=models.CharField(default='', max_length=20, null=True),
        ),
    ]
