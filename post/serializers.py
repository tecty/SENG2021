from rest_framework import serializers
from .models import Post, Location, Tag

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

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Location
        fields = ('id','name','lat','lng')
    