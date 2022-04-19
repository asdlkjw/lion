from django.shortcuts import render
import FAQ_model.models 
# Create your views here.
def support(request):

    db_all = FAQ_model.models.support.objects.all()
    db_ = [db for db in db_all]
    content = db_[0].content
    title = db_[0].title
    date = db_[0].created_at
    return render(request, 'supports/support.html' , {'content': content, 'title': title, 'date': date,} )
    
    # return render(request, 'supports/faq.html' )