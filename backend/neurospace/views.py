from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth.models import User # type: ignore
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer, ForumSerializer, CommentSerializer, LikeSerializer
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from .models import  Forum, Comment, Like


# Forum Views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def forum_list(request):
    if request.method == 'GET':
        forums = Forum.objects.all()
        serializer = ForumSerializer(forums, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ForumSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def forum_detail(request, pk):
    forum = get_object_or_404(Forum, pk=pk)
    if request.method == 'GET':
        serializer = ForumSerializer(forum)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ForumSerializer(forum, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        forum.delete()
        return Response({"message": "Forum deleted successfully."}, status=204)

# comment views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def comment_list(request):
    if request.method == 'GET':
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def comment_detail(request, pk):
    comment = get_object_or_404(Comment, pk=pk)
    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        comment.delete()
        return Response({"message": "Comment deleted successfully."}, status=204)

# Like Views
@api_view(['GET'])
def like_list(request):
    likes = Like.objects.all()
    serializer = LikeSerializer(likes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def like_detail(request, id):
    like = get_object_or_404(Like, pk=id)
    serializer = LikeSerializer(like)
    return Response(serializer.data)


@api_view(['POST'])
def login(request):
  user = get_object_or_404(User, username=request.data['username'])
  if not user.check_password(request.data['password']):
    return Response({"detail": "Not found"}, status=status.HTTP_400_BAD_REQUEST)
  token, created = Token.objects.get_or_create(user=user)
  serializer = UserSerializer(instance=user)
  return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def signup(request):
  serializer = UserSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    user = User.objects.get(username=request.data['username'])
    user.set_password(request.data['password'])
    user.save()
    token = Token.objects.create(user=user)
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.contrib.auth import logout as auth_logout

@api_view(['POST'])

def logout(request):
    auth_logout(request)
    return Response({"detail": "Logged out successfully."}, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
  return Response("passed for {}". format(request.user.email), status=status.HTTP_200_OK)
