from django.conf.urls import url
from django.views.generic import TemplateView

from .views import CommentListAPIView, CommentCreateAPIView

urlpatterns = [
    url(r'^$', CommentListAPIView.as_view(), name='list'),
    url(r'^create/$', CommentCreateAPIView.as_view(), name='create'),
]
