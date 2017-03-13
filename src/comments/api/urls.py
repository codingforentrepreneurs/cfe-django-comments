from django.conf.urls import url
from django.views.generic import TemplateView

from .views import CommentListAPIView

urlpatterns = [
    url(r'^$', CommentListAPIView.as_view(), name='list'),
]
