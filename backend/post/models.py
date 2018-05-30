from django.db import models
from django.contrib.auth.models import User 
from django.utils import timezone

# Create your models here.
class Tag(models.Model):
    # name of the hash tag
    name = models.CharField(max_length = 32)

    def __unicode__(self):
        # support string related field 
        return name


class Location(models.Model):
    # the exact name for that location
    name = models.CharField(max_length = 512,blank=True)
    # record the precise location of that location
    # has number before point is 15-12 = 3, after the point is 20
    lat = models.DecimalField(max_digits=24, decimal_places= 20)
    lng = models.DecimalField(max_digits=24, decimal_places= 20)

class Photo(models.Model):
    name = models.CharField(max_length = 2047)
    def __unicode__(self):
        return self.name

class Post(models.Model):
    # basic information of the post
    # title of the post 
    title= models.CharField(max_length = 255)
    # main corse of the post
    detail = models.CharField(max_length = 65535)
    # tag is a many to many relationship 
    tag = models.ManyToManyField(Tag,blank = True)
    # the create time of this post
    create_time = models.DateTimeField('Create Time')
    # location of this post, if a post is deleted, then this post wont 
    #   be deleted
    location =  models.ForeignKey(Location,models.PROTECT)
    # the user who write this 
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    # the photo address use of this post
    photo = models.ManyToManyField(Photo, blank =True)
    # the account who has liked this post
    liked =  models.ManyToManyField(User, blank = True,related_name="liked")

class Follow(models.Model):
    # django must provide a relate name if two slot use same model for
    # foreign key 

    # a table only for relationship of one user to another
    from_user = models.ForeignKey(User,on_delete= models.CASCADE,
                    related_name="from_user")
    to_user = models.ForeignKey(User, on_delete = models.CASCADE,
                    related_name="to_user")

class PreferTag(models.Model):
    # this user prefer which tag
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    # what tag he prefer.
    tag = models.ManyToManyField(Tag, blank = True)