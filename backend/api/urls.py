from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView, ProfileView, UserTokenObtainPairView,
    UserViewSet, TrackViewSet, PlaylistViewSet,
    ArtistViewSet, AlbumViewSet, TrendingTrackViewSet
)

# Auth URLs
urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', UserTokenObtainPairView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),
]

# Router for ViewSets
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'tracks', TrackViewSet)
router.register(r'playlists', PlaylistViewSet)
router.register(r'artists', ArtistViewSet)
router.register(r'albums', AlbumViewSet)
router.register(r'trending', TrendingTrackViewSet, basename='trending')

# Combine auth + viewsets
urlpatterns += router.urls