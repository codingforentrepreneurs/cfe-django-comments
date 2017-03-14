from rest_framework import serializers

from comments.models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'url', 'user', 'content', 'timestamp', 'updated')