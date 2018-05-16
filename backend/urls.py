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
from django.views import generic
from django.conf.urls import url, include
from rest_framework_swagger.views import get_swagger_view

api_urlpatterns = [
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls'))
]

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^$', generic.TemplateView.as_view(template_name='index.html')),
    url(r'^map/$', generic.TemplateView.as_view(template_name='index.html')),
    url(r'^about_us/$', generic.TemplateView.as_view(template_name='index.html')),
    path('api/v1/', include(api_urlpatterns)),
    url(r'^docs/$', get_swagger_view(title='API Docs'), name='api_docs'),
]
