from django.contrib import admin
from .models import  Forum, Comment, Like, UserProfile
from django.contrib.auth.admin import UserAdmin


admin.site.register(UserProfile)

admin.site.register(Forum)
admin.site.register(Comment)
admin.site.register(Like)
