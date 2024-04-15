from django.contrib import admin
from .models import User
from .models import Post
from .models import Comment
from .models import Like
from .models import Follow
from .models import Notification


admin.site.register(User)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Follow)
admin.site.register(Notification)
