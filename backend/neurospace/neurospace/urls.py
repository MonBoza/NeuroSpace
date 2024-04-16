from django.contrib import admin
from django.urls import path
from neurospace import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('UserProfile/', views.userprofile_list, name='UserProfile'),
    path('Forum/', views.get_forum, name='Forum'),
    path('Comment/', views.get_comment, name='Comment'),
    path('Like/', views.get_like, name='Like'),
]