from django.contrib.staticfiles.templatetags.staticfiles import static

from rest_framework import serializers

from comments.models import Comment

class CommentSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Comment
        fields = ('id', 'url', 'user', 'content', 'timestamp', 'updated', 'image')

    def get_image(self, obj):
        img_  = static("comments/img/user.png")
        # if obj.user.profile.image:
            # img_ = obj.user.profile.image
        return img_