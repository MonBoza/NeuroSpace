from django.contrib import admin
from .models import UserProfile, Forum, Comment, Like

admin.site.register(UserProfile)
admin.site.register(Forum)
admin.site.register(Comment)
admin.site.register(Like)
