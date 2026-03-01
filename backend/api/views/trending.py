from rest_framework import viewsets, permissions
from api.models import TrendingTrack
from api.serializers import TrendingTrackSerializer

class TrendingTrackViewSet(viewsets.ModelViewSet):
    queryset = TrendingTrack.objects.all()
    serializer_class = TrendingTrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]