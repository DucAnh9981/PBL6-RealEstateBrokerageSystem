# Generated by Django 5.1.2 on 2024-10-19 14:37

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('post_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('estate_type', models.CharField(choices=[('nhà', 'Nhà'), ('đất', 'Đất')], max_length=50)),
                ('price', models.DecimalField(decimal_places=1, max_digits=30)),
                ('status', models.CharField(choices=[('đang chờ duyệt', 'Đang chờ duyệt'), ('đã duyệt', 'Đã duyệt'), ('bị từ chối', 'Bị từ chối'), ('đã đóng', 'Đã đóng')], default='đang chờ duyệt', max_length=50)),
                ('city', models.CharField(blank=True, max_length=50, null=True)),
                ('district', models.CharField(blank=True, max_length=50, null=True)),
                ('street', models.CharField(blank=True, max_length=50, null=True)),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('orientation', models.CharField(blank=True, choices=[('bắc', 'Bắc'), ('nam', 'Nam'), ('đông', 'Đông'), ('tây', 'Tây'), ('đông bắc', 'Đông Bắc'), ('tây bắc', 'Tây Bắc'), ('đông nam', 'Đông Nam'), ('tây nam', 'Tây Nam')], max_length=50, null=True)),
                ('area', models.DecimalField(blank=True, decimal_places=1, max_digits=20, null=True)),
                ('frontage', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('bedroom', models.IntegerField(blank=True, null=True)),
                ('bathroom', models.IntegerField(blank=True, null=True)),
                ('floor', models.IntegerField(blank=True, null=True)),
                ('legal_status', models.CharField(choices=[('sổ đỏ', 'Sổ đỏ'), ('sổ hồng', 'Sổ hồng'), ('chưa có', 'Chưa có'), ('khác', 'Khác')], max_length=50)),
                ('sale_status', models.CharField(choices=[('đang bán', 'Đang bán'), ('đang thương lượng', 'Đang thương lượng'), ('đã cọc', 'Đã cọc'), ('đã bán', 'Đã bán')], max_length=50)),
                ('images', models.ImageField(blank=True, null=True, upload_to='post_images')),
                ('description', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]