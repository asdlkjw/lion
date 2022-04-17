from django.db import models

# Create your models here.
class support(models.Model):
    title = models.TextField('제목')
    content = models.TextField('내용')
    image = models.ImageField(verbose_name= '이미지')
    created_at = models.DateTimeField('작성일')
    view_count = models.IntegerField('조회수')