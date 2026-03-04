from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from api.models import User, UserFollow
from api.serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def follow(self, request, pk=None):
        target_user = self.get_object()
        if target_user == request.user:
            return Response({"detail": "Cannot follow yourself"}, status=status.HTTP_400_BAD_REQUEST)
        
        follow_relation, created = UserFollow.objects.get_or_create(
            follower=request.user,
            following=target_user
        )
        if not created:
            return Response({"detail": "Already following"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"status": f"You are now following {target_user.username}"}, status=status.HTTP_201_CREATED)

   
    @action(detail=True, methods=['delete'], permission_classes=[permissions.IsAuthenticated])
    def unfollow(self, request, pk=None):
        target_user = self.get_object()
        UserFollow.objects.filter(follower=request.user, following=target_user).delete()
        return Response({"status": f"You have unfollowed {target_user.username}"}, status=status.HTTP_204_NO_CONTENT)

   
    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def is_following(self, request, pk=None):
        target_user = self.get_object()
        is_following = UserFollow.objects.filter(follower=request.user, following=target_user).exists()
        return Response({"is_following": is_following}, status=status.HTTP_200_OK)