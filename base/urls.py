from django.urls import path
from . import views


urlpatterns = [
    path('login',views.login,name='login'),
    path('register',views.registerUser,name='register'),
    path('logout',views.logout,name='logout'),
    path('',views.dashboard,name='main'),
    path('profile/update',views.updateProfile,name='update-profile'),
    path('feedback/add',views.addFeedback,name='feedback'),
]
