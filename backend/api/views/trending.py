from rest_framework.viewsets import ReadOnlyModelViewSet
from api.models import Track
from api.serializers import TrackSerializer

class TrendingTrackViewSet(ReadOnlyModelViewSet):
    serializer_class = TrackSerializer

    def get_queryset(self):
        period = self.request.query_params.get("period", "alltime").lower()
        limit = self.request.query_params.get("limit")  # client can pass ?limit=10

        if period == "week":
            order_field = "-trackstat__weekly_plays"
        elif period == "month":
            order_field = "-trackstat__monthly_plays"
        else:
            order_field = "-trackstat__total_plays"

        queryset = Track.objects.select_related("artist", "trackstat").order_by(order_field)

        if limit:
            try:
                limit = int(limit)
                queryset = queryset[:limit]
            except ValueError:
                pass  # ignore if invalid limit

        return queryset