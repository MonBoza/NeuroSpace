# Generated by Django 5.0.4 on 2024-04-21 19:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('neurospace', '0008_remove_userprofile_username_alter_forum_title_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_pic',
            field=models.ImageField(default='profile_pics/default.jpg', null=True, upload_to='profile_pics/'),
        ),
    ]
