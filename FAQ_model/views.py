from django.shortcuts import render
import FAQ_model.models 
# Create your views here.
def support(request):

    db_all = FAQ_model.models.support.objects.all()
    db_ = [db for db in db_all]
    content = db_[-1].content
    title = db_[-1].title
    date = db_[-1].created_at
    user = db_[-1].create_user
    return render(request, 'supports/support.html' , {'content': content, 'title': title, 'date': date, 'user': user})
