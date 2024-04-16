from django.contrib import admin
from .models import  Forum, Comment, Like, CustomUser
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('bio', 'profile_pic')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('bio', 'profile_pic')}),
    )

admin.site.register(CustomUser, CustomUserAdmin)

admin.site.register(Forum)
admin.site.register(Comment)
admin.site.register(Like)
