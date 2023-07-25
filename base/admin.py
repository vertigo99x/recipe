from django.contrib import admin

from .models import MyUsers, Feedbacks

admin.site.register(MyUsers)
admin.site.register(Feedbacks)