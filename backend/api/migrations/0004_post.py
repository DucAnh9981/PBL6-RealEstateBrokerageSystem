# Generated by Django 5.1.2 on 2024-10-10 06:53

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_role_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('type', models.CharField(max_length=100)),
                ('price', models.FloatField()),
                ('city', models.CharField(max_length=100)),
                ('district', models.CharField(max_length=100)),
                ('street', models.CharField(max_length=100)),
                ('area', models.FloatField()),
                ('bedroom', models.IntegerField()),
                ('bathroom', models.IntegerField()),
                ('description', models.TextField(max_length=500)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]