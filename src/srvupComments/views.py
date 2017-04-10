from django.conf import settings
from django.views.generic import TemplateView


class LoginUrlTestTemplateView(TemplateView):
    def get_context_data(self, *args, **kwargs):
        context = super(LoginUrlTestTemplateView, self).get_context_data(*args, **kwargs)
        print(context)
        context['login_url'] = settings.LOGIN_URL
        return context