from rest_framework import serializers
from .models import Post, Location,Category, Tag

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

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model  =  Location
        fields = ('id','name','lat','lng')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model  = Category
        fields = ('id','name')

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model  = Post
        fields = (
            'id',
            'title',
            'tag',
            'create_time',
            'location',
            'author',
            'category'
        )

    # not require to given this fileds, overwite to support
    # auto generate information.
    author = serializers.ReadOnlyField(source= 'author.username')
    create_time = serializers.ReadOnlyField()

