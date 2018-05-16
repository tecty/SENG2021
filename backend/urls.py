"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers
from .views import UserViewSet,GroupViewSet
from post.views import TagViewSet,LocationViewSet,\
                        CategoryViewSet,PostViewSet
from django.views import generic


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'tags',TagViewSet)
router.register(r'locations', LocationViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'posts',PostViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    # import the legacy pages 
    url(r'^', include('root.urls')),
    # the port for the rest api 
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # import all auth
    url(r'^accounts/', include('allauth.urls')),
    # import the map 
     url(r'^map/$', generic.TemplateView.as_view(template_name='index.html')),
]
