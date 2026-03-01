from rest_framework import viewsets, permissions
from api.models import Album
from api.serializers import AlbumSerializer

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]