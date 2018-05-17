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
            'detail',
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
    # tags ,locations and category as a nested field
    tag = TagSerializer(many = True)
    location = LocationSerializer()
    category = CategorySerializer()

    def create(self, validated_data):
        """
        Create a post by checking tag and location 
        Then add the related object to this post
        """
        """ Create post with a location """
        location_data = validated_data.pop('location')
        print(location_data)

        # create a new one or get a old for reference
        this_location = Location.objects.get_or_create(
            **location_data
        )

        """
        Find the Category for create this post
        """
        category_data = validated_data.pop("category")
        this_category = Category.objects.get(
            **category_data
        )
        
        # must pop the tags data before it would used to create a post 
        tags_data = validated_data.pop('tag')

        # create a instance of this post
        this_post = Post.objects.create(
            location = this_location[0],
            category = this_category,
             **validated_data)

        """Associate tag's informatiion to post"""
      
        for tag in tags_data:
            this_tag = Tag.objects.get_or_create(name = tag.name)
            # attach this tag to this post 
            this_post.tag = this_tag

        # return the created post 
        return this_post


    # not acquire tags
    # tag = serializers.ManyRelatedField()

