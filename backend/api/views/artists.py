from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from api.models import Artist
from api.serializers import ArtistSerializer

class ArtistViewSet(ModelViewSet):
    queryset = Artist.objects.select_related('user')
    serializer_class = ArtistSerializer
    permission_classes = [AllowAny]