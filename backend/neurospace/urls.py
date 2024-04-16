
from django.contrib import admin
from django.urls import re_path
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('login', views.login),
    re_path('signup', views.signup),
    re_path('logout', views.logout),
    re_path('test_token', views.test_token),

]
