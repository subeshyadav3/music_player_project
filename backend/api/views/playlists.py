from rest_framework import viewsets, permissions
from api.models import Playlist
from api.serializers import PlaylistSerializer

class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]