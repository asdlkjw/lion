# Generated by Django 4.0.2 on 2022-04-18 12:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='support',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField(verbose_name='질문')),
                ('category', models.CharField(max_length=20, verbose_name='카테고리')),
                ('content', models.TextField(verbose_name='답변')),
                ('create_user', models.CharField(max_length=20, verbose_name='생성자')),
                ('created_at', models.DateTimeField(verbose_name='생성일시')),
                ('last_user', models.CharField(max_length=20, verbose_name='최종 수정자')),
                ('last_at', models.DateTimeField(verbose_name='최종 수정일시')),
            ],
        ),
    ]