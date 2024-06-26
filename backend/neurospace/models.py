from django.contrib import admin
from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.hashers import make_password



class UserProfile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, null=True)
    profile_pic = models.ImageField(upload_to='profile_pics/', null=True, default='profile_pics/default.jpg')
    date_created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        if self.user:
            return self.user.username
        else:
            return "UserProfile"
    
class Forum(models.Model):
    title = models.CharField(max_length=400)
    description = models.TextField(max_length=500)
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comments = models.ManyToManyField(User, through='Comment', related_name='comments')

    def __str__(self):
        return self.title

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE)
    content = models.TextField(max_length=500)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} likes {self.forum.title}"