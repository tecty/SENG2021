from rest_framework import serializers
from .models import Post, Location, Tag,Photo



# class PostSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only = True)
#     title = serializers.CharField(max_length = 255)
#     detail = serializers.CharField(max_length = 2047)

#     def create(self,validated_data):
#         """create a Post from json"""
#         return Post.objects.create(**validated_data)

#     def update(self, instance, validated_data):
#         """Update the data by json"""
#         instance

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Tag
        fields = ('id','name')

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Photo
        fields = ('id','name')

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model  =  Location
        fields = ('id','name','lat','lng')

# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model  = Category
#         fields = ('id','name')

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model  = Post
        fields = (
            'id',
            'title',
            'detail',
            'tag',
            'create_time',
            'location',
            'author',
            'photo'
        )

    # not require to given this fileds, overwite to support
    # auto generate information.
    author = serializers.ReadOnlyField(source= 'author.username')
    create_time = serializers.ReadOnlyField()
    # tags ,locations and category as a nested field
    tag = TagSerializer(many = True)
    location = LocationSerializer()
    photo = PhotoSerializer(many = True)

    def create(self, validated_data):
        """
        Create a post by checking tag and location 
        Then add the related object to this post
        """
        """ Create post with a location """
        location_data = validated_data.pop('location')

        # create a new one or get a old for reference
        this_location = Location.objects.get_or_create(
            **location_data
        )

        # pop the photo url's data
        photo_data = validated_data.pop('photo')

        # must pop the tags data before it would used to create a post 
        tags_data = validated_data.pop('tag')
        # create a instance of this post
        this_post = Post.objects.create(
            location = this_location[0],
            **validated_data)

        """Associate tag's informatiion to post"""
        for tag in tags_data:
            this_tag = Tag.objects.get_or_create(name = tag.get('name'))
            print(tag.get('name'))
            print(this_tag)
            # attach this tag to this photos_datapost 
            this_post.tag.add(this_tag[0])

        """Associate the photo url """
        for photo in photo_data:
            this_post.photo.create(name = photo.get('name'))
        # return the created post 
        this_post.save()
        return this_post
    
    def update(self, instance, validated_data):
        location_data = validated_data.pop('location')
        instance.location = Location.objects.get_or_create(**location_data)[0]
        instance.title = validated_data.get('title', instance.title)
        instance.detail = validated_data.get('detail', instance.detail)
        tags_data = validated_data.pop('tag')
        # instance.tag = instance.tag.all()[0:0]
        # tags = (instance.tag).all()
        # tags = list(tags)
        instance.tag.all().delete()
        # print(instance.tag.all())
        # print(tags_data)
        photos_data = validated_data.pop('photo')
        instance.photo.all().delete()
        # photos = (instance.photo).all()
        # photos = list(photos)
        instance.save()
        for tag_data in tags_data:
            this_tag = Tag.objects.get_or_create(name = tag_data.get('name'))
            instance.tag.add(this_tag[0])
        for photo_data in photos_data:
            instance.photo.create(name=photo_data.get('name'))
        instance.save()
        return instance

        