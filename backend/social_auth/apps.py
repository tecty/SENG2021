from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _
from django.db.models.signals import post_migrate


def setup_social_apps(sender, **kwargs):
    """
    `allauth` needs tokens for OAuth based providers. So let's
    setup tokens
    """
    from allauth.socialaccount.providers import registry
    from allauth.socialaccount.models import SocialApp
    from allauth.socialaccount.providers.oauth.provider import OAuthProvider
    from allauth.socialaccount.providers.oauth2.provider import OAuth2Provider
    from django.contrib.sites.models import Site
    from backend.social_auth.social_apps import Providers

    site = Site.objects.get_current()
    site.name = "localhost"
    site.domain = Providers.site
    site.save()
    for provider in registry.get_list():
        if (isinstance(provider, OAuth2Provider)
                or isinstance(provider, OAuthProvider)):
            try:
                SocialApp.objects.get(provider=provider.id,
                                      sites=site)
            except SocialApp.DoesNotExist:
                print ("Installing application credentials for %s." % provider.id)
                app = SocialApp.objects.create(
                    provider=provider.id,
                    secret=Providers.get_secret(provider.id),
                    client_id=Providers.get_client_id(provider.id),
                    name='%s app' % provider.id)
                app.sites.add(site)

class AuthConfig(AppConfig):
    name = 'backend.social_auth'
    verbose_name = ('Auth')

    def ready(self):
        post_migrate.connect(setup_social_apps, sender=self)
