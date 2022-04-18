from csv import writer
from unicodedata import category
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class support(models.Model):  #질문, 카테고리, 답변, 생성자, 생성일시, 최종 수정자, 최종 수정일시
    title = models.TextField('질문')
    category = models.CharField('카테고리', max_length=20)
    content = models.TextField('답변')
    create_user = models.CharField('생성자',max_length=20)
    created_at = models.DateTimeField('생성일시')
    last_user = models.CharField('최종 수정자',max_length=20)
    last_at = models.DateTimeField('최종 수정일시')


class comment(models.Model):
    content = models.TextField(verbose_name='내용')
    created_at = models.DateTimeField('작성일')
    support = models.ForeignKey(to = 'support' , on_delete=models.CASCADE)
    writer = models.ForeignKey(to = 'writer' , on_delete=models.CASCADE)