from django.db import models
from django.contrib.auth.models import User 
from django.utils import timezone

# Create your models here.
class Tag(models.Model):
    # name of the hash tag
    name = models.CharField(max_length = 32)

class Location(object):
    # the exact name for that location
    name = models.CharField(max_length = 512)
    # record the precise location of that location
    # has number before point is 15-12 = 3, after the point is 12
    lat = models.DecimalField(max_digits=15, decimal_places= 12)
    lng = models.DecimalField(max_digits=15, decimal_places= 12)


class Post(models.Model):
    # basic information of the post
    # title of the post 
    title= models.CharField(max_length = 255)
    # main corse of the post
    detail = models.CharField(max_length = 2047)
    # tag is a many to many relationship 
    tag = models.ManyToManyField(Tag)
    # the create time of this post
    create_time = models.DateTimeField('Create Time')
    # location of this post, if a post is deleted, then this post wont 
    #   be deleted
    location =  models.ForeignKey(Location,models.PROTECT)
