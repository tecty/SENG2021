from django.urls import path 
from . import views

# this app name is root


# handle all the missing page in the root file
urlpatterns = [
    # account profile page
    # path('accounts/profile/',  rviews.profile,name = "accounts/profile" ),

    # the whole site index
    path('',views.index,name = 'index'),
]