from django.shortcuts import render
import FAQ_model.models 
# Create your views here.
def support(request):

    content = FAQ_model.models.support.objects.all()
    for con in content:
        print(con.content)

        
    return render(request, 'supports/support.html' )
