from django.contrib.auth import get_user_model
from django.contrib.staticfiles.templatetags.staticfiles import static

from rest_framework import serializers

from comments.models import Comment


User = get_user_model()

class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
        ]

class CommentSerializer(serializers.ModelSerializer):
    user = UserPublicSerializer(read_only=True)
    image = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Comment
        fields = ('id', 'url', 'user', 'content', 'timestamp', 'updated', 'image')

    def get_image(self, obj):
        img_  = static("comments/img/user.png")
        # if obj.user.profile.image:
            # img_ = obj.user.profile.image
        return img_


class CommentUpdateSerializer(serializers.ModelSerializer):
    user = UserPublicSerializer(read_only=True)
    image = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Comment
        fields = ('id', 'url', 'user', 'content', 'timestamp', 'updated', 'image')
        read_only_fields = ['url']
        
    def get_image(self, obj):
        img_  = static("comments/img/user.png")
        # if obj.user.profile.image:
            # img_ = obj.user.profile.image
        return img_