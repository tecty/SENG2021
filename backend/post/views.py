from .models import Tag, Location,Post,Follow,PreferTag
from .serializers import TagSerializer,LocationSerializer,\
                        PostSerializer,FollowSerializer,PreferTagSerializer
from rest_framework import generics,permissions,viewsets
from .permissions import IsAuthorOrReadOnly,IsAdminOrReadOnly,\
                        IsFromUserOrReadOnly
from django.utils import timezone
from rest_framework.decorators import action 
from rest_framework.response import Response
# function base view 
from rest_framework.decorators import api_view


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsAdminOrReadOnly,)


class LocationViewSet  (viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsAuthorOrReadOnly,)

    def perform_create(self,serializer):
        # insert create author and create date automatically
        serializer.save(
            author=self.request.user,
            create_time = timezone.now()
        )
    """
    Usage:
    https://localhost:8000/api/posts/?northeast.latitude=100&northeast.longitude=100&southwest.latitude=10&southwest.longitude=10
    """
    def get_queryset(self):
        ne_lat = self.request.query_params.get('northeast.latitude',None)
        ne_lng = self.request.query_params.get('northeast.longitude',None)
        sw_lat = self.request.query_params.get('southwest.latitude',None)
        sw_lng = self.request.query_params.get('southwest.longitude',None)
        if ne_lat and ne_lng and sw_lat and sw_lng:
            post_list = Post.objects.filter(
                location__lat__lte = ne_lat,
                location__lng__lte = ne_lng,
                location__lat__gte = sw_lat,
                location__lng__gte = sw_lng,
            )
            # return the fetch result 
            return post_list
        else: 
            # not sufficient, then return standard result
            return Post.objects.all()

class FollowViewSet(viewsets.ModelViewSet):
    queryset= Follow.objects.all()
    serializer = FollowSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsFromUserOrReadOnly,)

    def perform_create(self,serializer):
        serializer.save(
            from_user = request.user
        )

    def get_queryset(self):
        # fetch the following table base on the which user is search for
        from_id = self.request.query_params.get('from_id' ,None)
        to_id = self.request.query_params.get('to_id',None)
        if from_id:
            return Follow.objects.filter(from_user__id = from_id)
        elif  to_id:
            return Follow.objects.filter(to_user__id = to_id)
        else:
            #TODO: raise an error 
            pass