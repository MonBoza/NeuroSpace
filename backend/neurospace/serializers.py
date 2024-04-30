from rest_framework import serializers
from .models import Forum, Comment, Like, UserProfile
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(
    validators=[UniqueValidator(queryset=User.objects.all())],
    required=True,
   )
    username = serializers.CharField(
    validators=[UniqueValidator(queryset=User.objects.all())]
    )
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'bio', 'profile_pic']


class ForumSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
   
    class Meta:
        model = Forum
        fields = ['id', 'title', 'description', 'date', 'user', 'comments', ]

    def get_user(self, obj):
        return obj.user.username

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'user', 'forum', 'content', 'date']

    def get_user(self, obj):
        return obj.user.username


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'comment']
    def get_user(self, obj):
        return obj.user.username 