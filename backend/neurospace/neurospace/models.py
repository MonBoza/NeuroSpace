from django.db import models


class UserProfile(models.Model):
  name = models.CharField(max_length=100)
  email = models.EmailField()
  password = models.CharField(max_length=100)
  bio = models.TextField(max_length=500)
  profile_pic = models.ImageField(upload_to='profile_pics/')

  def __str__(self):
    return self.name
  
class Forum(models.Model):
  title = models.CharField(max_length=100)
  description = models.TextField(max_length=500)
  date = models.DateTimeField(auto_now_add=True)
  user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

  def __str__(self):
    return self.title
  
class Comment(models.Model):
  user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
  post = models.ForeignKey(Forum, on_delete=models.CASCADE)
  content = models.TextField(max_length=500)
  date = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.content
  
class Like(models.Model):
  user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
  post = models.ForeignKey(Forum, on_delete=models.CASCADE)

  def __str__(self):
    return self.user.name + ' likes ' + self.post.title

