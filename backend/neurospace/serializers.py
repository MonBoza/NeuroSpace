from rest_framework import serializers
from .models import Forum, Comment, Like, UserProfile
from django.contrib.auth.models import User


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
    user_profile = serializers.SerializerMethodField()
    
    class Meta:
        model = Forum
        fields = ['id', 'title', 'description', 'date', 'user', 'comments', 'user_profile']

    def get_user(self, obj):
        return obj.user.username

    def get_user_profile(self, obj):  
        return obj.user.userprofile

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    user_profile = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'user', 'user_profile', 'forum', 'content', 'date']

    def get_user(self, obj):
        return obj.user.username

    def get_user_profile(self, obj):  
        return obj.user.userprofile

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'comment']
    def get_user(self, obj):
        return obj.user.username 