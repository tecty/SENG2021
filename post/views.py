from .models import Tag, Location, Category,Post
from .serializers import TagSerializer,LocationSerializer,\
                        CategorySerializer,PostSerializer
from rest_framework import generics,permissions,viewsets
from .permissions import IsAuthorOrReadOnly,IsAdminOrReadOnly
from django.utils import timezone

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


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsAdminOrReadOnly,)


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
