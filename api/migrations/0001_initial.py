# Generated by Django 4.0.5 on 2023-05-02 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_name', models.CharField(max_length=60)),
                ('data', models.CharField(max_length=2000)),
                ('time', models.DateTimeField()),
                ('location', models.CharField(max_length=100)),
                ('image', models.ImageField(blank=True, upload_to='image')),
                ('is_liked', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=11)),
                ('password', models.CharField(max_length=50)),
            ],
        ),
    ]