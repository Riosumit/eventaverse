# Generated by Django 5.0 on 2024-03-15 10:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_event_image'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Event',
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
