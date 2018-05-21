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
    name = models.CharField(max_length = 512)
    # record the precise location of that location
    # has number before point is 15-12 = 3, after the point is 20
    lat = models.DecimalField(max_digits=24, decimal_places= 20)
    lng = models.DecimalField(max_digits=24, decimal_places= 20)

# class Category(models.Model):
#     # name of the category
#     name = models.CharField(max_length = 255)
#     def __unicode__(self):
#         return name


class Photo(models.Model):
    name = models.TextField()
    def __unicode__(self):
        return self.name

class Post(models.Model):
    # basic information of the post
    # title of the post 
    title= models.CharField(max_length = 255)
    # main corse of the post
    detail = models.CharField(max_length = 2047)
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


"""
{
    "title": "asdf",
    "detail": "wer",
    "tag": [{"name":"sth"}],
    "location": {
        "name": "asdf",
        "lat": 45,
        "lng": 45
    },
    "photo": []
}
"""


def create_post(title, detail, location , tags = None ):
    """
    create post by providing the its title details, location 
    User may also want to provide some tags to this post
    """
    the_post = Post(
        title = title,
        detail = detail,
        location = location,
        create_time = timezone.now(),
    )
    the_post.save()

    if tags:
        # add associated tag in to this post
        for t in tags:
            the_post.tags = t 
    
    return the_post


def create_location(name, lat, lng ):
    the_location = Location(
        name = name,
        lat = lat, 
        lng = lng
    )
    the_location.save()
    return the_location

def create_tag(name):
    the_tag = Tag(name = name )
    the_tag.save()
    return the_tag