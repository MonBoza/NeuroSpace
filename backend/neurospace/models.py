from django.contrib import admin
from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    username = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', null=True)
    bio = models.TextField(max_length=500, null=True)
    profile_pic = models.ImageField(upload_to='profile_pics/', null=True, default='media/profile_pics/default.jpg')
    date_created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        if self.user:
            return self.user.username
        else:
            return "UserProfile"
    
class Forum(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Forum, on_delete=models.CASCADE)
    content = models.TextField(max_length=500)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Forum, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} likes {self.post.title}"