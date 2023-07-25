from django.shortcuts import render, redirect
from django.contrib.auth.models import auth, User
from django.contrib import messages

from django.template.defaulttags import register
from django.contrib.auth.decorators import login_required
from django.conf import settings

from .models import MyUsers, Feedbacks

#=====================================================================


def dashboard(request):
    context = {}
    if request.user.is_authenticated:
        user = f"{request.user.id}"
        user = MyUsers.objects.filter(username = user)[0]
        context['myuser'] = user
    return render(request, 'index.html', context)


@login_required
def addFeedback(request):
    user = request.user
    if request.method == "POST":
        is_like = request.POST['is-like']
        feedback = request.POST['feedback']
        liked = True
        if is_like.strip().lower() == 'no':liked = False
        
        fd = Feedbacks.objects.create(
            is_liked=liked,
            description=feedback,
            username = user,
        )
        
        fd.save();
        
        messages.error(request, 'Your feedback has been submitted Successfully')
    
    return redirect('main')
        
        

@login_required
def updateProfile(request):
    user = f"{request.user.id}"
    if request.method =="POST":
        weight = request.POST['weight']
        fullname = request.POST['fullname']
        type = request.POST['diabetes_type']
        
        MyUsers.objects.filter(username = user).update(
            weight=weight,
            diabetes_type = int(type),
            fullname = fullname,
        )
        messages.error(request, 'Details Updated Successfully')
        
    return redirect('main')

#====================================================================


def login(request):
    if request.method == 'POST':
        username, password = request.POST['username'], request.POST['password']
        user = auth.authenticate(username = username, password = password)
        
        if user is not None:
            auth.login(request, user)
            return redirect('main')
        
        messages.error(request, 'User Does Not Exist!!')
        return redirect('login')
    
    return render(request, 'login.html', {"reg":False})


def registerUser(request):
    if request.method == 'POST':
        username, password = request.POST['username'], request.POST['password']
        weight = request.POST['weight']
        fullname = request.POST['fullname']
        email = request.POST['email']
        type = request.POST['diabetes_type']
        
        check_user = User.objects.filter(username=username).count()
        check_email = User.objects.filter(email=email).count()
        
        if check_user != 0 or check_email != 0:
            messages.error(request, 'User Already Exists')
            return render(request, 'login.html', {"reg":True})

        else:
            user = User.objects.create_user(
                username = username,
                password = password,
                email=email,
            )
            
            user.save();   
            
            
        check = User.objects.filter(username=username).values()[0]
        
        myuser = MyUsers.objects.create(
            username=user,
            weight=weight,
            diabetes_type = int(type),
            fullname = fullname,
        )
        myuser.save();
        
        messages.error(request, 'User Registered Successfully')
        return redirect('login')
    
    return render(request, 'login.html', {"reg":True})


def logout(request):
    if request.user.is_authenticated:
        auth.logout(request)
        
    return redirect('login')


