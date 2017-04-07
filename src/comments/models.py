from django.conf import settings
from django.db import models

# comments via urls and users

class Comment(models.Model):
    user        = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True)
    url         = models.URLField() # not a path, full url http://www.srvup.com/projects/1
    content     = models.TextField()
    #image       = models.ImageField()
    allow_annon = models.BooleanField(default=True)
    timestamp   = models.DateTimeField(auto_now_add=True)
    updated     = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.url

    @property
    def owner(self):
        return self.user

