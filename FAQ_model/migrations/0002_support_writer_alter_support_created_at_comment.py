# Generated by Django 4.0.2 on 2022-04-18 12:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('FAQ_model', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='support',
            name='writer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='support',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, verbose_name='생성일시'),
        ),
        migrations.CreateModel(
            name='comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(verbose_name='내용')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='작성일')),
                ('support', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='FAQ_model.support')),
                ('writer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]