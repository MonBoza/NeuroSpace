from django.shortcuts import render, redirect, get_object_or_404
from .models import UserProfile, Forum, Comment, Like

def user_profile(request, username):
    user_profile = get_object_or_404(UserProfile, user__username=username)
    return render(request, 'user_profile.html', {'user_profile': user_profile})

def forum_list(request):
    forums = Forum.objects.all()
    return render(request, 'forum_list.html', {'forums': forums})

def forum_detail(request, forum_id):
    forum = get_object_or_404(Forum, pk=forum_id)
    comments = Comment.objects.filter(post=forum)
    return render(request, 'forum_detail.html', {'forum': forum, 'comments': comments})

def comment_create(request, forum_id):
    if request.method == 'POST':
        forum = get_object_or_404(Forum, pk=forum_id)
        content = request.POST['content']
        user = request.user  # Assuming you have user authentication
        Comment.objects.create(user=user, post=forum, content=content)
        return redirect('forum_detail', forum_id=forum_id)
    else:
        return render(request, 'comment_form.html')

def like_create(request, forum_id):
    if request.method == 'POST':
        forum = get_object_or_404(Forum, pk=forum_id)
        user = request.user  # Assuming you have user authentication
        Like.objects.create(user=user, post=forum)
        return redirect('forum_detail', forum_id=forum_id)
