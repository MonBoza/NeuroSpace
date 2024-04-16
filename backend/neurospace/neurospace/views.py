from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile, Forum, Comment, Like
from .serializers import UserProfileSerializer, ForumSerializer, CommentSerializer, LikeSerializer

class UserProfileView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = UserProfile.objects.all()
        serializer = UserProfileSerializer(users, many=True)
        return Response(serializer.data)

class ForumView(APIView):
    def get(self, request):
        forum = Forum.objects.all()
        serializer = ForumSerializer(forum, many=True)
        return Response(serializer.data)

class CommentView(APIView):
    def get(self, request):
        comment = Comment.objects.all()
        serializer = CommentSerializer(comment, many=True)
        return Response(serializer.data)

class LikeView(APIView):
    def get(self, request):
        like = Like.objects.all()
        serializer = LikeSerializer(like, many=True)
        return Response(serializer.data)