from django.contrib import admin
from django.urls import re_path
from django.urls import path
from . import views
from .models import  Forum, Comment, Like, UserProfile

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('login', views.login),
    re_path('signup', views.signup),
    re_path('logout', views.logout),
    re_path('test_token', views.test_token),
    path('userprofile/', views.userprofile_list, name='userprofile_list'),
    path('userprofile/<int:id>/', views.userprofile_list, name='userprofile_list'),
    path('forum/', views.forum_list, name='forum_list'),
    path('forum/<int:id>/', views.forum_detail, name='forum_detail'),
    path('comment/', views.comment_list, name='comment_list'),
    path('comment/<int:id>/', views.comment_detail, name='comment_detail'),

    path('like/', views.like_list, name='like_list'),
    path('like/<int:id>/', views.like_detail, name='like_detail'),


]
